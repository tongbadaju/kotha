import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

let isRefreshing = false;
const refreshSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // 1) Attach the access token if present
  const token = auth.getAccessToken();
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  // 2) Handle response errors
  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      // Only handle JWT expiration
      if (
        err.status === 401 &&
        err.error?.code === 'token_not_valid'
      ) {
        // If not already refreshing, start the refresh flow
        if (!isRefreshing) {
          isRefreshing = true;
          refreshSubject.next(null);

          return auth.refreshToken().pipe(
            switchMap(newAccess => {
              isRefreshing = false;
              // notify waiting requests
              refreshSubject.next(newAccess);
              // retry the original request
              return next(
                req.clone({
                  setHeaders: { Authorization: `Bearer ${newAccess}` }
                })
              );
            }),
            catchError(refreshErr => {
              // refresh failed: redirect to login
              isRefreshing = false;
              auth.logout();
              router.navigate(['/']);
              return EMPTY;
            })
          );
        }

        // If a refresh is already in progress, queue this request
        return refreshSubject.pipe(
          filter(t => t != null),
          take(1),
          switchMap(newAccess =>
            next(
              req.clone({
                setHeaders: { Authorization: `Bearer ${newAccess}`! }
              })
            )
          )
        );
      }

      // Other errors: propagate
      return throwError(() => err);
    })
  );
};

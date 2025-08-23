import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, switchMap, tap, map, catchError, throwError } from 'rxjs';
import { Account, LoginResponse, TokenRefreshResponse } from '../models/account.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/auth`;

  // Holds the latest Account or null
  private currentUserSubject = new BehaviorSubject<Account | null>(null);

  // Public read-only stream
  currentUser$: Observable<Account | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  // Call this on app start or after login to populate currentUserSubject
  fetchCurrentUser(): Observable<Account> {
    return this.http
      .get<Account>(`${this.apiUrl}/me/`)
      .pipe(
        tap(user => this.currentUserSubject.next(user))
      );
  }

  get currentUser(): Account | null {
    return this.currentUserSubject.getValue();
  }

  // Returns the raw token if you need it elsewhere
  getAccessToken(): string | null {
    return localStorage.getItem('access');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh');
  }

  refreshToken(): Observable<string> {
    const refresh = this.getRefreshToken();
    if (!refresh) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http
      .post<TokenRefreshResponse>(`${this.apiUrl}/refresh/`, { refresh })
      .pipe(
        tap(res => {
          // store new tokens
          localStorage.setItem('access', res.access);
          if (res.refresh) {
            localStorage.setItem('refresh', res.refresh);
          }
        }),
        map(res => res.access),
        catchError(err => {
          // if refresh failed, force logout
          this.logout();
          return throwError(() => err);
        })
      );
  }
 
  // True if a token exists (not necessarily valid!)
  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  // Perform login, store tokens and immediately fetch user profile.
  login(phoneNumber: string, password: string): Observable<Account> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login/`, { phoneNumber, password })
      .pipe(
        tap((res: LoginResponse) => {
          localStorage.setItem('access',  res.access);
          localStorage.setItem('refresh', res.refresh);
        }),
        switchMap(() => this.fetchCurrentUser()) 
      );
  }

  register(
    fullName: string,
    phoneNumber: string,
    password: string
  ): Observable<Account> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/register/`, {
        name: fullName,
        phoneNumber,
        password
      })
      .pipe(
        tap(res => {
          localStorage.setItem('access', res.access);
          localStorage.setItem('refresh', res.refresh);
          this.currentUserSubject.next(res.user);
        }),
        map(res => res.user)
      );
  }

  // Clear localStorage and reset currentUserSubject
  logout(): void {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    this.currentUserSubject.next(null);

    this.router.navigate(['/']);
  }
}

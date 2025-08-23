import {
  ApplicationConfig,
  provideAppInitializer,
  provideZoneChangeDetection,
  inject
} from '@angular/core';

import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withFetch,
  withInterceptors
} from '@angular/common/http';

import { firstValueFrom } from 'rxjs';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { AuthService } from './core/services/auth.service';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideRouter(routes),

    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
    ),

    // New initializer provider
    provideAppInitializer(() => {
      const auth = inject(AuthService);

      // Only fetch if we have a token
      if (!auth.isLoggedIn()) {
        return;
      }

      // Return a Promise so Angular waits for it
      return firstValueFrom(auth.fetchCurrentUser());
    })
  ]
};

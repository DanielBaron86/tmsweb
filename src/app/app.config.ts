import {ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';

import { routes } from './routes/app.routes';
import {authInterceptor, loggingInterceptor, refreshTokenInterceptor} from './interceptors/http-interceptors';
import {ConfigService} from './services/config/config-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => {
      const configService = inject(ConfigService);
      return configService.loadConfig();
    }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes,withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor,refreshTokenInterceptor]), withFetch()),
    provideClientHydration(withEventReplay())
  ]
};

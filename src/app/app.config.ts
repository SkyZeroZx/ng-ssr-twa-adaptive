import { swRegistrationOptions } from '@/core/service-worker';
import { provideContextService } from '@/services/context';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
  withHttpTransferCacheOptions,
} from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withHttpTransferCacheOptions({}), withEventReplay()),
    provideServiceWorker('ngsw-worker.js', swRegistrationOptions),
    provideHttpClient(withFetch()),
    provideContextService(),
  ],
};

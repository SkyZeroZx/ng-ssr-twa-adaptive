import { appInitialConfig } from '@/core/config/http-cache';
import { swRegistrationOptions } from '@/core/config/service-worker';
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
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { provideEventPlugins } from '@taiga-ui/event-plugins';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions({
        skipInitialTransition: true,
      })
    ),
    provideClientHydration(withHttpTransferCacheOptions({}), withEventReplay()),
    provideServiceWorker('ngsw-worker.js', swRegistrationOptions),
    provideHttpClient(withFetch()),
    provideContextService(),
    provideEventPlugins(),
    appInitialConfig,
  ],
};

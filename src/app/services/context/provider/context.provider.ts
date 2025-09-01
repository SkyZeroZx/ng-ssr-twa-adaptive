import { isPlatformServer } from '@angular/common';
import {
  inject,
  makeEnvironmentProviders,
  PLATFORM_ID,
  Provider,
} from '@angular/core';

import { ContextBrowserService } from '../strategies/browser/context-browser.service';
import { ContextServerService } from '../strategies/server/context-server.service';
import { CONTEXT_VALUE, ContextService } from '../token/context.token';

export function provideContextService(context?: string): Provider {
  const contextValueProvider = context
    ? [{ provide: CONTEXT_VALUE, useValue: context }]
    : [];

  return [
    makeEnvironmentProviders(contextValueProvider),
    {
      provide: ContextService,
      useFactory: () => {
        const platformId = inject(PLATFORM_ID);
        const isServer = isPlatformServer(platformId);

        if (isServer) {
          return inject(ContextServerService);
        }

        return inject(ContextBrowserService);
      },
    },
  ];
}

import { isPlatformServer } from '@angular/common';
import { inject, PLATFORM_ID, Provider } from '@angular/core';

import { ContextBrowserService } from '../strategies/browser/context-browser.service';
import { ContextServerService } from '../strategies/server/context-server.service';
import { ContextService } from '../token/context.token';

export function provideContextService(): Provider {
  return {
    provide: ContextService,
    useFactory: () => {
      const platformId = inject(PLATFORM_ID);
      const isServer = isPlatformServer(platformId);

      if (isServer) {
        return inject(ContextServerService);
      }

      return inject(ContextBrowserService);
    },
  };
}

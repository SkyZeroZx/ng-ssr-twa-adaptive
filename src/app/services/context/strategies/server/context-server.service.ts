import { inject, Injectable, REQUEST, RESPONSE_INIT } from '@angular/core';

import { ContextService } from '../../token/context.token';
import { isAndroidAppReferer } from '../../utils/utils';
import { ContextBaseService } from '../base/context-base.service';

@Injectable({
  providedIn: 'root',
})
export class ContextServerService
  extends ContextBaseService
  implements ContextService
{
  private readonly request = inject(REQUEST);
  private readonly responseInit = inject(RESPONSE_INIT, { optional: true });

  constructor() {
    super();
    this.setupContext();
  }

  setupContext(): void {
    this.userAgent.set(this.request?.headers.get('user-agent')!);

    const context = this.getContextValue(
      this.request?.headers.get('cookie')!,
      this.request!.url
    );

    const referer = this.request!.headers.get('referer')!;

    const isValidContext = this.contextValue === context;

    if (isAndroidAppReferer(referer) && isValidContext) {
      // Similar implementation it's possible using a TransferState
      this.ctx.set(context);

      const headers = new Headers(this.responseInit!.headers);

      const cookieString = `_ctx=${this.ctx()}; Path=/; Max-Age=${
        60 * 60 * 24 * 365
      }; SameSite=Lax; Secure`;

      headers.append('Set-Cookie', cookieString);

      this.responseInit!.headers = headers;

      this.removeQueryContext();
    }
  }
}

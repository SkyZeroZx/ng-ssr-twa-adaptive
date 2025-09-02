import {
  inject,
  Injectable,
  REQUEST,
  RESPONSE_INIT,
  signal,
} from '@angular/core';

import { ContextService } from '../../token/context.token';
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

  override userAgent = signal(this.request?.headers.get('user-agent')!);

  override cookies = signal(this.request?.headers.get('cookie')!);

  override url = signal(this.request?.url!);

  override referer = signal(this.request?.headers.get('referer')!);

  constructor() {
    super();
    this.setupContext();
  }

  setupContext(): void {
    if (this.isAllowedContext()) {
      // Similar implementation it's possible using a TransferState
      this.ctx.set(this.contextValue);

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

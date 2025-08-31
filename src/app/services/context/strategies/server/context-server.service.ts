import { inject, Injectable, REQUEST, RESPONSE_INIT } from '@angular/core';
import { CONTEXT_VALUE, ContextService } from '../../token/context.token';
import {
  getContextFromURL,
  getCookies,
  isAndroidAppReferer,
  isMobile,
} from '../../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class ContextServerService implements ContextService {
  private readonly request = inject(REQUEST);
  private readonly responseInit = inject(RESPONSE_INIT, { optional: true });
  private readonly contextValue = inject(CONTEXT_VALUE);
  private ctx = '';

  setupContext(): void {
    const cookies = getCookies(this.request?.headers.get('cookie')!);

    const context = cookies?.['_ctx'] ?? getContextFromURL(this.request!.url);

    const referer = this.request!.headers.get('referer')!;

    const isValidContext = this.contextValue === context;

    if (isAndroidAppReferer(referer) && isValidContext) {
      // Similar implementation it's possible using a TransferState
      this.ctx = this.contextValue;

      const headers = new Headers(this.responseInit!.headers);

      const cookieString = `_ctx=${this.ctx}; Path=/; Max-Age=${
        60 * 60 * 24 * 365
      }; SameSite=Lax; Secure`;

      headers.append('Set-Cookie', cookieString);

      this.responseInit!.headers = headers;
    }
  }

  private validateContext(): boolean {
    return this.ctx === this.contextValue;
  }

  isMobile(): boolean {
    return (
      isMobile(this.request?.headers.get('user-agent')!) &&
      !this.validateContext()
    );
  }

  isDesktop(): boolean {
    return !isMobile(this.request?.headers.get('user-agent')!);
  }

  isTWA(): boolean {
    return (
      this.validateContext() &&
      isMobile(this.request?.headers.get('user-agent')!)
    );
  }
}

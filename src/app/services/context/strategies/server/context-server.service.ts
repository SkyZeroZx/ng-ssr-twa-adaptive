import { inject, Injectable, REQUEST, RESPONSE_INIT } from '@angular/core';
import { ContextService } from '../../token/context.token';
import {
  getContextFromURL,
  getCookies,
  isValidTWAContext,
} from '../../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class ContextServerService implements ContextService {
  private readonly request = inject(REQUEST);
  private readonly responseInit = inject(RESPONSE_INIT, { optional: true });
  private ctx = '';

  setupContext(): void {
    const cookies = getCookies(this.request?.headers.get('cookie')!);

    const contextValue =
      cookies?.['_ctx'] ?? getContextFromURL(this.request!.url);

    const referer = this.request!.headers.get('referer')!;

    if (isValidTWAContext(contextValue, referer)) {
      this.ctx = 'twa';
      const headers = new Headers(this.responseInit!.headers);

      const cookieString = `_ctx=${this.ctx}; Path=/; Max-Age=${
        60 * 60 * 24 * 365
      }; SameSite=Lax; Secure`;

      headers.append('Set-Cookie', cookieString);

      this.responseInit!.headers = headers;
    }
  }

  isTWA(): boolean {
    return this.ctx === 'twa';
  }
}

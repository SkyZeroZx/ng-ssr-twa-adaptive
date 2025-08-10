import { DOCUMENT, inject, Injectable } from '@angular/core';
import { ContextService } from '../../token/context.token';
import { getContextFromURL, getCookies, isValidTWAContext } from '../../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class ContextBrowserService implements ContextService {
  private readonly document = inject(DOCUMENT);
  private ctx = '';

  setupContext() {
    const cookies = getCookies(this.document.cookie);
    const contextValue = cookies?.['_ctx'] ?? getContextFromURL(this.document.URL);

    if (isValidTWAContext(contextValue, this.document.referrer)) {
      this.ctx = 'twa';
    }
  }

  isTWA(): boolean {
    return this.ctx === 'twa';
  }
}

import { DOCUMENT, inject, Injectable } from '@angular/core';
import { CONTEXT_VALUE, ContextService } from '../../token/context.token';
import {
  getContextFromURL,
  getCookies,
  isAndroidAppReferer,
} from '../../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class ContextBrowserService implements ContextService {
  private readonly document = inject(DOCUMENT);
  private readonly contextValue = inject(CONTEXT_VALUE);
  private ctx = '';

  setupContext() {
    const cookies = getCookies(this.document.cookie);
    const context = cookies?.['_ctx'] ?? getContextFromURL(this.document.URL);

    if (isAndroidAppReferer(this.document.referrer)) {
      this.ctx = this.contextValue;
    }
  }

  isTWA(): boolean {
    return this.ctx === this.contextValue;
  }
}

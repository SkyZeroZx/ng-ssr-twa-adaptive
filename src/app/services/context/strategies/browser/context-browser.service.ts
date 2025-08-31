import { DOCUMENT, inject, Injectable } from '@angular/core';
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
export class ContextBrowserService implements ContextService {
  private readonly document = inject(DOCUMENT);
  private readonly contextValue = inject(CONTEXT_VALUE);
  private ctx = '';

  setupContext() {
    const cookies = getCookies(this.document.cookie);
    const context = cookies?.['_ctx'] ?? getContextFromURL(this.document.URL);

    const isValidContext = context === this.contextValue;

    if (isValidContext && isAndroidAppReferer(this.document.referrer)) {
      this.ctx = this.contextValue;
    }
  }

  private validateContext(): boolean {
    return this.ctx === this.contextValue;
  }

  isMobile(): boolean {
    return (
      isMobile(this.document.defaultView?.navigator?.userAgent) &&
      !this.validateContext()
    );
  }

  isDesktop(): boolean {
    return !isMobile(this.document.defaultView?.navigator?.userAgent);
  }

  isTWA(): boolean {
    return (
      this.validateContext() &&
      isMobile(this.document.defaultView?.navigator?.userAgent)
    );
  }
}

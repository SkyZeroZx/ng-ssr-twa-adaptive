import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

import { CONTEXT_VALUE } from '../../token/context.token';
import {
  getContextFromURL,
  getCookies,
  isAndroidAppReferer,
  isMobile,
} from '../../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class ContextBaseService {
  protected readonly contextValue = inject(CONTEXT_VALUE);

  private readonly router = inject(Router);

  protected readonly ctx = signal('');

  protected readonly userAgent = signal('');

  protected readonly cookies = signal('');

  protected readonly url = signal('');

  protected readonly referer = signal('');

  private readonly isValidContext = computed(() => this.ctx() === this.contextValue);

  readonly isAllowedContext = computed(
    () =>
      this.checkContext(this.cookies(), this.url(), this.contextValue) &&
      isAndroidAppReferer(this.referer())
  );

  readonly isMobile = computed(
    () => isMobile(this.userAgent()) && !this.isValidContext()
  );

  readonly isDesktop = computed(() => !isMobile(this.userAgent()));

  readonly isTWA = computed(
    () => this.isValidContext() && isMobile(this.userAgent())
  );

  /**
   * Remove the query context from the URL.
   */
  protected removeQueryContext() {
    this.router.navigate([], {
      queryParams: {},
      replaceUrl: true,
    });
  }

  private checkContext(cookies: string, url: string, contextValue: string) {
    const contextApp = getCookies(cookies)?.['_ctx'] ?? getContextFromURL(url);
    return contextApp === contextValue;
  }
}

import { computed, inject, Injectable, signal } from '@angular/core';
import { getContextFromURL, getCookies, isMobile } from '../../utils/utils';
import { CONTEXT_VALUE } from '../../token/context.token';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ContextBaseService {
  protected readonly contextValue = inject(CONTEXT_VALUE);
  
  private readonly router = inject(Router);

  protected readonly ctx = signal('');

  protected readonly userAgent = signal('');

  readonly isValidContext = computed(() => this.ctx() === this.contextValue);

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
  
  /**
   *  Get the context value from cookies or URL.
   * @param cookies
   * @param url
   * @returns context string
   */
  protected getContextValue(cookies: string, url: string) {
    return getCookies(cookies)?.['_ctx'] ?? getContextFromURL(url);
  }
}

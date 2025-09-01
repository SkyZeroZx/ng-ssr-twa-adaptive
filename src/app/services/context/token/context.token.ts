import { InjectionToken, Signal } from '@angular/core';

/**
 * Abstract service for managing application context
 * Determines if the app is running as a TWA (Trusted Web Activity)
 */
export abstract class ContextService {
  /**
   * Initializes the context based on cookies, URL params, and referrer
   */
  abstract setupContext(): void;

  /**
   * Returns true if the application is running on a mobile device
   */
  abstract readonly isMobile: Signal<boolean>;

 /**
  * Returns true if the application is running on a desktop device
  */
  abstract readonly isDesktop: Signal<boolean>;

  /**
   * Returns true if the application is running as a TWA
   */
  abstract readonly isTWA: Signal<boolean>;
}

export const CONTEXT_VALUE = new InjectionToken<string>('CONTEXT_VALUE', {
  factory: () => 'twa',
});

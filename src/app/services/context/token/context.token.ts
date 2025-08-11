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
   * Returns true if the application is running as a TWA
   */
  abstract isTWA(): boolean;
}

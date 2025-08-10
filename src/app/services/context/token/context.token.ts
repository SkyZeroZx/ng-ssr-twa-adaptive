export abstract class ContextService {
  abstract setupContext(): void;
  abstract isTWA(): boolean;
}

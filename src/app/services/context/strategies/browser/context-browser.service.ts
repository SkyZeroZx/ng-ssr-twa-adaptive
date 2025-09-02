import { DOCUMENT, inject, Injectable, signal } from '@angular/core';

import { ContextService } from '../../token/context.token';
import { ContextBaseService } from '../base/context-base.service';

@Injectable({
  providedIn: 'root',
})
export class ContextBrowserService
  extends ContextBaseService
  implements ContextService
{
  private readonly document = inject(DOCUMENT);
  override userAgent = signal(this.document.defaultView?.navigator.userAgent!);
  override cookies = signal(this.document.cookie);
  override url = signal(this.document.URL);
  override referer = signal(this.document.referrer);

  constructor() {
    super();
    this.setupContext();
  }

  setupContext() {
    if (this.isAllowedContext()) {
      this.ctx.set(this.contextValue);
      this.removeQueryContext();
    }
  }
}

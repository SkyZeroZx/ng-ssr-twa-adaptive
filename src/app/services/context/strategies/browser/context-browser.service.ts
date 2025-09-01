import { DOCUMENT, inject, Injectable } from '@angular/core';

import { ContextService } from '../../token/context.token';
import { isAndroidAppReferer } from '../../utils/utils';
import { ContextBaseService } from '../base/context-base.service';

@Injectable({
  providedIn: 'root',
})
export class ContextBrowserService
  extends ContextBaseService
  implements ContextService
{
  private readonly document = inject(DOCUMENT);

  constructor() {
    super();

    this.setupContext();
  }

  setupContext() {
    this.userAgent.set(this.document.defaultView?.navigator.userAgent!);

    const context = this.getContextValue(
      this.document.cookie,
      this.document.URL
    );

    const isValidContext = context === this.contextValue;

    if (isValidContext && isAndroidAppReferer(this.document.referrer)) {
      this.ctx.set(context);
      this.removeQueryContext();
    }
  }
}

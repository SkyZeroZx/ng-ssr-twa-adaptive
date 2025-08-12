import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  PLATFORM_ID,
} from '@angular/core';

@Component({
  selector: 'app-shared-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './shared-button.component.html',
  styleUrls: ['./shared-button.component.scss'],
})
export class SharedButtonComponent {
  readonly size = input<'base' | 'small'>('base');
  readonly background = input<'white' | 'gray'>('gray');

  private readonly plataformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.plataformId);

  async shared() {
    if (this.isBrowser) {
      const sharedProduct = {
        title: 'Shared Product Title',
        text: 'Shared Product Description',
        url: window.location.href,
      };

      try {
        await navigator.share(sharedProduct);
      } catch (e) {
        console.warn('error when intent use Web API Shared', e);
      }
    }
  }
}

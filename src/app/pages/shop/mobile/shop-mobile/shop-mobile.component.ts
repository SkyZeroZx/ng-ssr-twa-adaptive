import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { debounceTime, filter, map, startWith, switchMap } from 'rxjs';

import { ScrollEndDirective } from '@/shared/directives/scroll-end';
import { ProductWebComponent } from '@/shared/ui/product/web/product-web.component';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  computed,
} from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiIcon, TuiLoader } from '@taiga-ui/core';

import { ShopBaseComponent } from '../../base/shop-base.component';
import { TuiChip } from '@taiga-ui/kit';
import { TitleCasePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-shop-mobile',
  imports: [
    ReactiveFormsModule,
    TuiButton,
    TuiIcon,
    TuiLoader,
    NgxSkeletonLoaderComponent,
    ProductWebComponent,
    ScrollEndDirective,
    FormsModule,
    TuiChip,
    TitleCasePipe,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './shop-mobile.component.html',
  styleUrl: './shop-mobile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ShopMobileComponent extends ShopBaseComponent {
  readonly viewMode = signal<'grid' | 'list'>('grid');

  // Categories for filter
  readonly categories = rxResource({
    stream: () => this.productService.getCategoryList(),
  });

  // Grid configuration based on view mode
  readonly gridCols = computed(() => {
    return this.viewMode() === 'grid' ? 'grid-cols-2' : 'grid-cols-1';
  });

  onViewModeToggle() {
    this.viewMode.update((mode) => (mode === 'grid' ? 'list' : 'grid'));
  }

  onProductAddToCart(product: any) {
    console.log('Add to cart:', product);
    // Implement cart logic
  }

  onProductAddToWishlist(product: any) {
    console.log('Add to wishlist:', product);
    // Implement wishlist logic
  }

  onProductView(product: any) {
    console.log('View product:', product);
    // Navigate to product detail
  }

  onProductShare(product: any) {
    console.log('Share product:', product);
    // Implement share functionality
  }
}

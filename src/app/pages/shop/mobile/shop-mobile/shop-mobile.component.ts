import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';

import { ScrollEndDirective } from '@/shared/directives/scroll-end';
import { ProductWebComponent } from '@/shared/ui/product/web/product-web.component';
import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TuiButton, TuiIcon, TuiLoader } from '@taiga-ui/core';
import { TuiChip } from '@taiga-ui/kit';

import { ShopBaseComponent } from '../../base/shop-base.component';
import { ProductCard } from '../../../../core/interfaces';

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
  private readonly router = inject(Router);
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

  onProductAddToCart(product: ProductCard) {
    console.log('Add to cart:', product);
    // Implement cart logic
  }

  onProductAddToWishlist(product: ProductCard) {
    console.log('Add to wishlist:', product);
    // Implement wishlist logic
  }

  onProductView(product: ProductCard) {
    this.router.navigate(['/product', product.id]);
  }
}

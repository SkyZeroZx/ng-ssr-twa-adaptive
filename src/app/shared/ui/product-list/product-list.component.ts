import { shopCartAnimation } from '@/core/animations';
import { ShopCart } from '@/core/interfaces';
import { ShopCartService } from '@/services/shop-cart';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { TuiButton, TuiDialogContext } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';

import { ProductCartQuantityControlComponent } from './components/product-cart-quantity-control';
import { ProductItemListComponent } from './components/product-item-list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [
    ProductItemListComponent,
    ProductCartQuantityControlComponent,
    TuiButton,
    RouterLink,
  ],
  animations: [...shopCartAnimation],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  private readonly shopCartService = inject(ShopCartService);
  readonly disableAnimation = input(false, { transform: booleanAttribute });
  readonly hideHeader = input(false, { transform: booleanAttribute });

  readonly context = injectContext<TuiDialogContext<void>>({ optional: true });

  readonly products = computed(() => this.shopCartService.state());

  remove(productCart: ShopCart) {
    this.shopCartService.remove(productCart);
  }

  changeQuantity(productCart: ShopCart) {
    this.shopCartService.updateQuantity(productCart);
  }


  closeDialog() {
    this.context?.completeWith?.();
  }
}

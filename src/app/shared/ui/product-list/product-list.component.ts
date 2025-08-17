import { shopCartAnimation } from '@/core/animations';
import { ShopCart } from '@/core/interfaces';
import { ShopCartService } from '@/services/shop-cart';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { TuiDialogContext, TuiButton } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';

import { ProductCartQuantityControlComponent } from './components/product-cart-quantity-control';
import { ProductItemListComponent } from './components/product-item-list';

@Component({
  selector: 'app-product-list',
  imports: [ProductItemListComponent, ProductCartQuantityControlComponent, TuiButton],
  animations: [...shopCartAnimation],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  private readonly shopCartService = inject(ShopCartService);
  readonly context = injectContext<TuiDialogContext<void>>();

  readonly products = computed(() => this.shopCartService.state());

  remove(productCart: ShopCart) {
    this.shopCartService.remove(productCart);
  }

  changeQuantity(productCart: ShopCart) {
    this.shopCartService.updateQuantity(productCart);
  }
}

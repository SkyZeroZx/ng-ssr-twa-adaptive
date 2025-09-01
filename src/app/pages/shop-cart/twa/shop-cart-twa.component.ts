import { ProductListComponent } from '@/shared/ui/product-list/product-list.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-shop-cart-twa',
  imports: [ProductListComponent],
  templateUrl: './shop-cart-twa.component.html',
  styleUrl: './shop-cart-twa.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ShopCartTwaComponent {}

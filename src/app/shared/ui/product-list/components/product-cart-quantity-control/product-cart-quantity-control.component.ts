import { distinctUntilChanged } from 'rxjs';

import { ShopCart } from '@/core/interfaces';
import {
  ChangeDetectionStrategy,
  Component,
  linkedSignal,
  model,
  output,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { TuiIcon } from '@taiga-ui/core';

import { NumberValidationDirective } from './directives';

@Component({
  selector: 'app-cart-quantity-control',
  imports: [FormsModule, NumberValidationDirective, TuiIcon],
  templateUrl: './product-cart-quantity-control.component.html',
  styleUrl: './product-cart-quantity-control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCartQuantityControlComponent {
  readonly productCart = model.required<ShopCart>();

  readonly removeProduct = output<ShopCart>();

  readonly quantity = linkedSignal(() => this.productCart().quantity);

  constructor() {
    this.onChangeControl();
  }

  onChangeControl() {
    toObservable(this.quantity)
      .pipe(distinctUntilChanged())
      .subscribe((quantity) => {
        this.productCart.update((value) => ({
          ...(value as ShopCart),
          quantity,
        }));
      });
  }

  clickedUpdate(value: number) {
    const updateQuantity = this.quantity() + value;
    this.quantity.set(updateQuantity);
  }

  clickRemove() {
    this.removeProduct.emit({
      ...(this.productCart() as ShopCart),
    });
  }
}

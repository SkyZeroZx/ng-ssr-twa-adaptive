import { distinctUntilChanged } from 'rxjs';

import { ShopCart } from '@/core/interfaces';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  model,
  OnInit,
  output,
} from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { NumberValidationDirective } from './directives';
import { TuiIcon } from "@taiga-ui/core";

@Component({
  selector: 'app-cart-quantity-control',
  imports: [FormsModule, ReactiveFormsModule, NumberValidationDirective, TuiIcon],
  templateUrl: './product-cart-quantity-control.component.html',
  styleUrl: './product-cart-quantity-control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCartQuantityControlComponent implements OnInit {
  readonly quantity = input.required<number>();
  readonly productCart = model.required<ShopCart>();

  readonly removeProduct = output<ShopCart>();
  private readonly fb = inject(NonNullableFormBuilder);

  quantityControl = this.fb.control<number>(0, [Validators.min(0)]);

  constructor() {
    // Add this effect because the view and model not sync when update ShopCart
    effect(() => {
      this.quantityControl.setValue(this.quantity(), { emitEvent: false });
    });
  }

  ngOnInit(): void {
    this.initControl();
    this.onChangeControl();
  }

  initControl() {
    this.quantityControl = this.fb.control<number>(
      this.productCart()!.quantity,
      [Validators.min(0)]
    );
  }

  onChangeControl() {
    this.quantityControl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((quantity) => {
        this.productCart.update((value) => ({
          ...(value as ShopCart),
          quantity,
        }));
      });
  }

  clickedUpdate(value: number) {
    const updateQuantity = this.quantityControl.value + value;
    this.quantityControl.setValue(updateQuantity);
  }

  clickRemove() {
    this.removeProduct.emit({
      ...(this.productCart() as ShopCart),
    });
  }
}

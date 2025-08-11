import { ShopCart } from '@/core/interfaces';
import { objectCompare } from '@/core/util';
import { isPlatformBrowser } from '@angular/common';
import {
  afterNextRender,
  effect,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';

const SHOP_CART = 'SHOP_CART';

@Injectable({
  providedIn: 'root',
})
export class ShopCartService {
  private readonly stateShopCart = signal<ShopCart[]>([]);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    afterNextRender(() => {
      this.stateShopCart.set(
        JSON.parse(localStorage.getItem(SHOP_CART) ?? '[]') ?? []
      );
    });
    if (this.isBrowser) {
      effect(() => {
        if (this.stateShopCart()?.length > 0) {
          localStorage.setItem(SHOP_CART, JSON.stringify(this.stateShopCart()));
        }
      });
    }
  }

  get state() {
    return this.stateShopCart.asReadonly();
  }

  add(item: ShopCart): void {
    const cart = this.state();
    const existingIndex = cart.findIndex((cartItem) => {
      const { quantity: _, ...cartItemNoQty } = cartItem;
      const { quantity: __, ...itemNoQty } = item;
      return objectCompare(cartItemNoQty, itemNoQty);
    });
    if (existingIndex >= 0) {
      const updatedCart = cart.map((cartItem, idx) =>
        idx === existingIndex
          ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
          : cartItem
      );
      this.stateShopCart.set(updatedCart);
    } else {
      this.stateShopCart.set([...cart, item]);
    }
  }

  remove(productToRemove: ShopCart): void {
    const state = this.stateShopCart();
    const stateWithItemRemove = state.filter(
      (productCart) => productToRemove.id !== productCart.id
    );

    this.stateShopCart.set(stateWithItemRemove);
  }
}

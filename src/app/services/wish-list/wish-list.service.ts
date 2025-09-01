import { ProductCard } from '@/core/interfaces';
import { isPlatformBrowser } from '@angular/common';
import {
  afterNextRender,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { skip } from 'rxjs';

const WISH_LIST = 'WISH_LIST';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  private readonly stateWishList = signal<ProductCard[]>([]);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    afterNextRender(() => {
      this.stateWishList.set(
        JSON.parse(localStorage.getItem(WISH_LIST) ?? '[]') ?? []
      );
    });

    if (this.isBrowser) {
      toObservable(this.stateWishList)
        .pipe(skip(1))
        .subscribe((state) => {
          if (state.length >= 0) {
            localStorage.setItem(WISH_LIST, JSON.stringify(state));
          }
        });
    }
  }

  get state() {
    return this.stateWishList.asReadonly();
  }

  addOrRemove(product: ProductCard) {
    const currentList = this.stateWishList();
    if (currentList.some(item => item.id === product.id)) {
      this.remove(product);
    } else {
      this.stateWishList.set([...currentList, product]);
    }
  }

  remove(product: ProductCard) {
    const currentList = this.stateWishList();
    this.stateWishList.set(
      currentList.filter((item) => item.id !== product.id)
    );
  }
}

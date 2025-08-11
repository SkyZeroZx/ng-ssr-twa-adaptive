import { ProductCard } from '@/core/interfaces';
import { CurrencyPipe, Location, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarouselComponent } from '@/shared/ui/carousel/carousel.component';
import { Slide } from '@/shared/ui/carousel/carousel.interface';
import { ButtonWishListComponent } from '@/shared/ui/button-wish-list';
import { SharedButtonComponent } from '@/shared/ui/shared-button';
import { TuiAlertService, TuiIcon } from '@taiga-ui/core';
import { ShopCartService } from '../../../../services/shop-cart';

@Component({
  selector: 'app-product-detail-twa',
  imports: [
    FormsModule,
    CarouselComponent,
    ButtonWishListComponent,
    SharedButtonComponent,
    TuiIcon,
    CurrencyPipe,
    TitleCasePipe
  ],
  templateUrl: './product-detail-twa.component.html',
  styleUrl: './product-detail-twa.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export default class ProductDetailTwaComponent {
  private readonly shopCartService = inject(ShopCartService);
  private readonly alertService = inject(TuiAlertService);
  product = input.required<ProductCard>();
  readonly slides = computed(() => {
    return [
      {
        src: this.product().image,
        height: 888,
        width: 800,
      },
    ] as Slide[];
  });
  private readonly location = inject(Location);

  quantity = signal(1);
  readonly selectedVariation = linkedSignal(() => this.product());

  goBack() {
    this.location.back();
  }

  increaseQuantity() {
    const maxQuantity = this.selectedVariation().stock;
    if (this.quantity() < maxQuantity) {
      this.quantity.update((q) => q + 1);
    }
  }

  decreaseQuantity() {
    if (this.quantity() > 1) {
      this.quantity.update((q) => q - 1);
    }
  }

  addToCart() {
    this.shopCartService.add({
      ...this.product(),
      quantity: this.quantity(),
    });

    this.alertService.open('Product added to cart').subscribe();
  }
}

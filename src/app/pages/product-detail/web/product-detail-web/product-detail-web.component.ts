import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import {
   DecimalPipe,
  Location,
  TitleCasePipe,
} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCard } from '@/core/interfaces';
import { TuiButton, TuiIcon, TuiAlertService } from '@taiga-ui/core';
import { TuiRating, TuiBadge } from '@taiga-ui/kit';
import { ShopCartService } from '@/services/shop-cart';

@Component({
  selector: 'app-product-detail-web',
  imports: [
    FormsModule,
    DecimalPipe,
    TuiButton,
    TitleCasePipe,
    TuiIcon,
    TuiRating,
    TuiBadge,
  ],
  templateUrl: './product-detail-web.component.html',
  styleUrl: './product-detail-web.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductDetailWebComponent {
  private readonly shopCartService = inject(ShopCartService);
  private readonly alertService = inject(TuiAlertService);
  private readonly location = inject(Location);

  product = input.required<ProductCard>();

  // State management
  quantity = signal(1);
  selectedImageIndex = signal(0);
  isZoomed = signal(false);
  activeTab = signal<'description' | 'specifications' | 'reviews'>(
    'description'
  );

  // Computed properties
  formattedPrice = computed(() => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(this.product().price);
  });

  isInStock = computed(() => this.product().stock > 0);

  stockStatus = computed(() => {
    const stock = this.product().stock;
    if (stock === 0) return 'Out of Stock';
    if (stock <= 5) return `Only ${stock} left in stock`;
    return 'In Stock';
  });

  stockStatusClass = computed(() => {
    const stock = this.product().stock;
    if (stock === 0) return 'text-red-600';
    if (stock <= 5) return 'text-orange-600';
    return 'text-green-600';
  });

  totalPrice = computed(() => {
    return this.product().price * this.quantity();
  });

  // Gallery simulation (since we only have one image)
  productImages = computed(() => [
    this.product().image,
    this.product().image, // Simulating multiple angles
    this.product().image,
    this.product().image,
  ]);

  // Methods
  goBack(): void {
    this.location.back();
  }

  increaseQuantity(): void {
    const maxQuantity = this.product().stock;
    if (this.quantity() < maxQuantity) {
      this.quantity.update((q) => q + 1);
    }
  }

  decreaseQuantity(): void {
    if (this.quantity() > 1) {
      this.quantity.update((q) => q - 1);
    }
  }

  setQuantity(newQuantity: number): void {
    const maxQuantity = this.product().stock;
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      this.quantity.set(newQuantity);
    }
  }

  selectImage(index: number): void {
    this.selectedImageIndex.set(index);
  }

  toggleZoom(): void {
    this.isZoomed.update((zoomed) => !zoomed);
  }

  setActiveTab(tab: 'description' | 'specifications' | 'reviews'): void {
    this.activeTab.set(tab);
  }

  addToCart(): void {
    if (!this.isInStock()) return;

    this.shopCartService.add({
      ...this.product(),
      quantity: this.quantity(),
    });

    this.alertService
      .open('Product added to cart successfully', { appearance: 'positive' })
      .subscribe();
  }

  buyNow(): void {
    if (!this.isInStock()) return;

    this.addToCart();
    // Navigate to checkout (implement as needed)
    console.log('Navigating to checkout...');
  }

  addToWishlist(): void {
    this.alertService
      .open('Added to wishlist', { appearance: 'info' })
      .subscribe();
  }

  shareProduct(): void {
    if (navigator.share) {
      navigator.share({
        title: this.product().name,
        text: this.product().description,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers without native sharing
      navigator.clipboard.writeText(window.location.href);
      this.alertService
        .open('Link copied to clipboard', { appearance: 'info' })
        .subscribe();
    }
  }
}

import { ProductCard } from '@/core/interfaces';
import { CurrencyPipe, SlicePipe, TitleCasePipe } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiButton, TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-product-web',
  imports: [
    FormsModule,
    TuiButton,
    CurrencyPipe,
    TuiIcon,
    SlicePipe,
    TitleCasePipe,
  ],
  templateUrl: './product-web.component.html',
  styleUrls: ['./product-web.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductWebComponent {
  readonly product = input.required<ProductCard>();
  readonly layout = input<'grid' | 'list'>('grid');
  readonly showQuickActions = input(true, { transform: booleanAttribute });
  readonly showDescription = input(true, { transform: booleanAttribute });

  // Outputs using signals
  readonly addToCart = output<ProductCard>();
  readonly addToWishlist = output<ProductCard>();
  readonly viewProduct = output<ProductCard>();
  readonly shareProduct = output<ProductCard>();

  readonly isFavorite = signal(false);

  readonly isInStock = computed(() => this.product().stock > 0);

  readonly stockStatus = computed(() => {
    const stock = this.product().stock;
    if (stock === 0) return 'Out of stock';
    if (stock <= 5) return `Only ${stock} left`;
    return 'In stock';
  });

  readonly stockStatusClass = computed(() => {
    const stock = this.product().stock;
    if (stock === 0) return 'text-red-600 bg-red-50';
    if (stock <= 5) return 'text-orange-600 bg-orange-50';
    return 'text-green-600 bg-green-50';
  });

  onAddToCart(): void {
    if (this.isInStock()) {
      this.addToCart.emit(this.product());
    }
  }

  onToggleWishlist(): void {
    this.isFavorite.set(!this.isFavorite());
    this.addToWishlist.emit(this.product());
  }

  onViewProduct(): void {
    this.viewProduct.emit(this.product());
  }

  onShareProduct(): void {
    this.shareProduct.emit(this.product());
  }
}

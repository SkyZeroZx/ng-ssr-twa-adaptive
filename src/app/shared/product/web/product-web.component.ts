import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
} from '@angular/core';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
 import { ProductCard } from '../../../core/interfaces/product-card.interface';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, SlicePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-product-web',
  standalone: true,
  imports: [FormsModule, TuiButton, CurrencyPipe, TuiIcon , SlicePipe , TitleCasePipe],
  templateUrl: './product-web.component.html',
  styleUrls: ['./product-web.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductWebComponent {
  // Inputs using signals
  product = input.required<ProductCard>();
  layout = input<'grid' | 'list'>('grid');
  showQuickActions = input<boolean>(true);
  showDescription = input<boolean>(true);

  // Outputs using signals
  addToCart = output<ProductCard>();
  addToWishlist = output<ProductCard>();
  viewProduct = output<ProductCard>();
  shareProduct = output<ProductCard>();

  isFavorite = signal(false);

  isInStock = computed(() => this.product().stock > 0);

  stockStatus = computed(() => {
    const stock = this.product().stock;
    if (stock === 0) return 'Out of stock';
    if (stock <= 5) return `Only ${stock} left`;
    return 'In stock';
  });

  stockStatusClass = computed(() => {
    const stock = this.product().stock;
    if (stock === 0) return 'text-red-600 bg-red-50';
    if (stock <= 5) return 'text-orange-600 bg-orange-50';
    return 'text-green-600 bg-green-50';
  });

  // Methods
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

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductTwaComponent } from '@/shared/ui/product/twa';
import { WishListService } from '../../../services/wish-list';

@Component({
  selector: 'app-wish-list-twa',
  imports: [ProductTwaComponent],
  templateUrl: './wish-list-twa.component.html',
  styleUrl: './wish-list-twa.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class WishListTwaComponent {
  private readonly wishListService = inject(WishListService);
  readonly wishList = this.wishListService.state;
}

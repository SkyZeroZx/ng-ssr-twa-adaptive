import { ShopCart } from '@/core/interfaces';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiSwipeActions } from '@taiga-ui/addon-mobile';
import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-product-item-list',
  imports: [TuiSwipeActions, TitleCasePipe, RouterLink, TuiIcon, CurrencyPipe],
  templateUrl: './product-item-list.component.html',
  styleUrl: './product-item-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItemListComponent {
  readonly productCart = input.required<ShopCart>();

  readonly clickedView = output<void>();

  readonly removeItem = output<ShopCart>();

  clickedRemove() {
    this.removeItem.emit(this.productCart());
  }

  onClickedView() {
    this.clickedView.emit();
  }
}

import { ShopCart } from '@/core/interfaces';
import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiSwipeActions } from '@taiga-ui/addon-mobile';
import { TuiIcon } from "@taiga-ui/core";

@Component({
  selector: 'app-product-item-list',
  imports: [TuiSwipeActions, TitleCasePipe, RouterLink, TuiIcon],
  templateUrl: './product-item-list.component.html',
  styleUrl: './product-item-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItemListComponent {
  readonly productCart = input.required<ShopCart>();

  protected isSwipe = signal<boolean>(false);

  readonly removeItem = output<ShopCart>();

  clickedRemove() {
    this.removeItem.emit(this.productCart());
  }
}

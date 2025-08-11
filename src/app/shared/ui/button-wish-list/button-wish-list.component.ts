import {
  ChangeDetectionStrategy,
  Component,
  model,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { HeartWishDirective } from './directive/button-wish-list.directive';

@Component({
  selector: 'app-button-wish-list',
  imports: [HeartWishDirective],
  templateUrl: './button-wish-list.component.html',
  styleUrls: ['./button-wish-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonWishListComponent {
  isWish = model(false);

  wClick = output<boolean>();

  wishClick() {
    this.isWish.set(!this.isWish());

    this.wClick.emit(this.isWish());
  }
}

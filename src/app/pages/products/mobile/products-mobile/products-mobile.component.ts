import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-products-mobile',
  imports: [],
  templateUrl: './products-mobile.component.html',
  styleUrl: './products-mobile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductsMobileComponent {}

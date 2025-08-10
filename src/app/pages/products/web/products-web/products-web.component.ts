import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-products-web',
  imports: [],
  templateUrl: './products-web.component.html',
  styleUrl: './products-web.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductsWebComponent {}

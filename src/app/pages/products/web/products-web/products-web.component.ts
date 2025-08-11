import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductService } from '../../../../services/product/product.service';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductWebComponent } from '../../../../shared/product/web/product-web.component';
import { TuiButton, TuiDataList, TuiOption, TuiIcon } from '@taiga-ui/core';
import { TuiSlider, TuiSelect } from '@taiga-ui/kit';

@Component({
  selector: 'app-products-web',
  imports: [
    ProductWebComponent,
    TuiButton,
    TuiDataList,
    TuiOption,
    TuiIcon,
    TuiSlider,
    TuiSelect
  ],
  templateUrl: './products-web.component.html',
  styleUrl: './products-web.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductsWebComponent {
  private readonly productService = inject(ProductService);

  products = toSignal(
    this.productService
      .getProducts({
        search: '',
        limit: 10,
        skip: 0,
      })
      .pipe(map(({ data }) => data)),
    {
      initialValue: [],
    }
  );
}

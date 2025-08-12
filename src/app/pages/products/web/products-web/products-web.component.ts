import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductService } from '../../../../services/product/product.service';
import { map, startWith, switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductWebComponent } from '../../../../shared/product/web/product-web.component';
import { TuiButton, TuiDataList, TuiOption, TuiIcon } from '@taiga-ui/core';
import { TuiSlider, TuiSelect, TuiPagination } from '@taiga-ui/kit';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-web',
  imports: [
    ProductWebComponent,

    TuiDataList,

    TuiSlider,
    TuiSelect,
    CategoryFilterComponent,
    TuiPagination,
  ],
  templateUrl: './products-web.component.html',
  styleUrl: './products-web.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductsWebComponent {
  private readonly productService = inject(ProductService);
  private readonly activateRoute = inject(ActivatedRoute);
  private readonly category$ = this.activateRoute.params.pipe(
    map((params) => params['category'] as string)
  );

  products = toSignal(
    this.category$.pipe(
      startWith(''),
      switchMap((category) =>
        this.productService
          .getProducts({
            search: '',
            limit: 10,
            skip: 0,
            category,
          })
          .pipe(map(({ data }) => data))
      )
    ),
    {
      initialValue: [],
    }
  );

  goToPage(index: number) {
    console.log('Go to page:', index);
  }
}

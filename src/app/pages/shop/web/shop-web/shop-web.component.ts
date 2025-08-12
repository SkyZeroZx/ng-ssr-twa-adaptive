import { map, startWith, switchMap } from 'rxjs';

import { ProductService } from '@/services/product';
import { ProductWebComponent } from '@/shared/product/web/product-web.component';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TuiPagination } from '@taiga-ui/kit';

import { CategoryFilterComponent } from './components/category-filter/category-filter.component';

@Component({
  selector: 'app-shop-web',
  imports: [
    ProductWebComponent,
    CategoryFilterComponent,
    TuiPagination,
    RouterLink,
  ],
  templateUrl: './shop-web.component.html',
  styleUrl: './shop-web.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ShopWebComponent {
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

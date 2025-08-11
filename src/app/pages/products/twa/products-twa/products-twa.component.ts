import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { debounceTime, filter, map, startWith, switchMap } from 'rxjs';

import { ProductService } from '@/services/product/product.service';
import { ProductTwaComponent } from '@/shared/product/twa/product-twa.component';
import { AsyncPipe, CurrencyPipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { TuiSearchResults } from '@taiga-ui/experimental';
import { TuiCell, TuiInputSearch, TuiNavigation } from '@taiga-ui/layout';

@Component({
  selector: 'app-products-twa',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    AsyncPipe,
    AsyncPipe,
    ReactiveFormsModule,
    TuiCell,
    TuiInputSearch,
    TuiNavigation,
    TuiSearchResults,
    TuiTextfield,
    TuiTitle,
    NgxSkeletonLoaderComponent,
    CurrencyPipe,
    NgTemplateOutlet,
    ProductTwaComponent,
  ],
  templateUrl: './products-twa.component.html',
  styleUrl: './products-twa.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductsTwaComponent {
  popular = [];
  readonly searchControl = new FormControl<string>('');
  private readonly productService = inject(ProductService);

  readonly results$ = this.searchControl.valueChanges.pipe(
    debounceTime(300),
    filter(Boolean),
    startWith(''),
    switchMap((search) =>
      this.productService
        .getProducts({
          search,
          limit: 10,
          skip: 0,
        })
        .pipe(
          map(({ data }) => ({
            products: data,
          }))
        )
    )
  );

  readonly results = toSignal(this.results$, {
    initialValue: {
      products: [],
    },
  });

  onShow(show: boolean) {
    console.log('show search', show);
  }
}

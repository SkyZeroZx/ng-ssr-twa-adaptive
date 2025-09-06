import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { debounceTime, filter, map, startWith, switchMap } from 'rxjs';

import { ScrollEndDirective } from '@/shared/directives/scroll-end';
import { ProductTwaComponent } from '@/shared/ui/product/twa';
import { AsyncPipe, CurrencyPipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { TuiSearchResults } from '@taiga-ui/experimental';
import { TuiCell, TuiInputSearch, TuiNavigation } from '@taiga-ui/layout';

import { ShopBaseComponent } from '../../base/shop-base.component';

@Component({
  selector: 'app-shop-twa',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    AsyncPipe,
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
    ScrollEndDirective,
  ],
  templateUrl: './shop-twa.component.html',
  styleUrl: './shop-twa.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ShopTwaComponent extends ShopBaseComponent {
  popular = [];
  readonly searchControl = new FormControl<string>('');

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
          order: 'asc',
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

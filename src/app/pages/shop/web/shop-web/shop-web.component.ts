import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';

import { ProductWebComponent } from '@/shared/ui/product/web';
import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';

import { ShopBaseComponent } from '../../base/shop-base.component';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { distinctUntilChanged, filter, startWith, tap } from 'rxjs';
import { PAGINATION_DEFAULT } from '../../../../core/constants/pagination';

@Component({
  selector: 'app-shop-web',
  imports: [
    ProductWebComponent,
    CategoryFilterComponent,
    NgTemplateOutlet,
    RouterLink,
    TuiButton,
    NgxSkeletonLoaderComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './shop-web.component.html',
  styleUrl: './shop-web.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ShopWebComponent extends ShopBaseComponent {
  sortControl = new FormControl('asc', { nonNullable: true });

  constructor() {
    super();
    this.sortControl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((order) => {
        this.pagination.set({
          ...PAGINATION_DEFAULT,
          category: this.category(),
          order,
        });
        this.products.set([]);
      });
  }
}

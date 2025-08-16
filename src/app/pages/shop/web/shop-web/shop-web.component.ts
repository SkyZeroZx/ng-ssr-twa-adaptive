import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';

import { ProductWebComponent } from '@/shared/product/web/product-web.component';
import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';

import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { ShopBaseComponent } from '../../base/shop-base.component';

@Component({
  selector: 'app-shop-web',
  imports: [
    ProductWebComponent,
    CategoryFilterComponent,
    NgTemplateOutlet,
    RouterLink,
    TuiButton,
    NgxSkeletonLoaderComponent,
  ],
  templateUrl: './shop-web.component.html',
  styleUrl: './shop-web.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ShopWebComponent extends ShopBaseComponent {}

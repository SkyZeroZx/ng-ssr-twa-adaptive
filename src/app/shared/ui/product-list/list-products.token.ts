import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
 import { InjectionToken } from '@angular/core';
import { ProductListComponent } from './product-list.component';

const PRODUCT_LIST_COMPONENT = new PolymorpheusComponent(ProductListComponent);

export const PRODUCT_LIST = new InjectionToken('LIST_PRODUCT_COMPONENT', {
  factory: () => PRODUCT_LIST_COMPONENT,
});
 
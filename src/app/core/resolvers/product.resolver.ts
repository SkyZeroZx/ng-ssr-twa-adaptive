import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { ProductCard } from '../interfaces';
import { inject } from '@angular/core';
import { ProductService } from '../../services/product/product.service';

export const productResolver: ResolveFn<ProductCard> = (
  route: ActivatedRouteSnapshot
) => {
  const productService = inject(ProductService);

  return productService.findById(route.paramMap.get('id') ?? '');
};

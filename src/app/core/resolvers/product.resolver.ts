import { ProductCard } from '@/core/interfaces';
import { ProductService } from '@/services/product';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

export const productResolver: ResolveFn<ProductCard> = (
  route: ActivatedRouteSnapshot
) => {
  const productService = inject(ProductService);

  return productService.findById(route.paramMap.get('id') ?? '');
};

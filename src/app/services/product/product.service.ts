import { map, Observable } from 'rxjs';
import { Cacheable } from 'ts-cacheable';

import { PAGINATION_DEFAULT } from '@/core/constants/pagination';
import {
  PaginationOptions,
  PaginationResult,
  Product,
  ProductCard,
  ProductRAW,
} from '@/core/interfaces';
import { createPaginationMetaData, toProductCard } from '@/core/util';
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);

  @Cacheable()
  getProducts(
    paginationOptions: PaginationOptions = PAGINATION_DEFAULT
  ): Observable<PaginationResult<ProductCard>> {
    let params = new HttpParams();

    params = params.append('limit', paginationOptions.limit ?? '10');

    params = params.append('skip', paginationOptions.skip ?? '0');

    params = params.append('q', paginationOptions.search ?? '');

    return this.http
      .get<ProductRAW>(`${environment.API}/products/search`, { params })
      .pipe(
        map((res) => ({
          data: res.products.map(toProductCard),
          meta: createPaginationMetaData(res.total, res.skip, res.limit),
        }))
      );
  }

  @Cacheable()
  findById(id: number | string): Observable<ProductCard> {
    return this.http
      .get<Product>(`${environment.API}/products/${id}`)
      .pipe(map(toProductCard));
  }
}

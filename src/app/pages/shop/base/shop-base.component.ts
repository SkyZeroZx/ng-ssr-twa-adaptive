import { filter, map, take, tap } from 'rxjs';

import { PAGINATION_DEFAULT } from '@/core/constants/pagination';
import {
  PaginationOptions,
  PaginationResult,
  ProductCard,
} from '@/core/interfaces';
import { ProductService } from '@/services/product';
import {
  Component,
  computed,
  effect,
  inject,
  linkedSignal,
  signal,
  Signal,
} from '@angular/core';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: '',
})
export abstract class ShopBaseComponent {
  private readonly productService = inject(ProductService);

  private readonly activateRoute = inject(ActivatedRoute);

  private readonly category$ = this.activateRoute.params.pipe(
    map((params) => params['category'] as string)
  );

  private readonly category = toSignal(this.category$);

  readonly pagination = linkedSignal(() => {
    return {
      ...PAGINATION_DEFAULT,
      category: this.category(),
    };
  });

  readonly products = signal<ProductCard[]>([]);

  readonly listProducts = rxResource<
    PaginationResult<ProductCard>,
    { pagination: PaginationOptions }
  >({
    params: () => ({ pagination: this.pagination() }),
    stream: ({ params }) => this.productService.getProducts(params.pagination),
  });

  readonly value: Signal<PaginationResult<ProductCard> | undefined> = toSignal(
    toObservable(this.listProducts.value).pipe(
      filter((res) => !!res),
      tap(({ data }) => {
        this.products.set([...this.products(), ...data]);
      })
    )
  );

  readonly metaPagination = computed(() => this.value()?.meta);

  readonly loading$ = toObservable(this.listProducts.isLoading);

  readonly firstLoad = toSignal(
    this.loading$.pipe(
      filter((value) => !value),
      take(1)
    )
  );

  readonly endOfList = computed(
    () => !this.metaPagination()?.hasNextPage && !this.listProducts.error()
  );

  constructor() {
    effect(() => {
      if (this.category()) {
        this.resetFilter();
      }
    });
  }

  loadMore() {
    // to avoid when scrolling cancel request when update signal is emitted
    if (this.listProducts.isLoading() || !this.metaPagination()?.hasNextPage) {
      return;
    }

    this.pagination.update((pagination) => ({
      limit: pagination.limit,
      skip: pagination.skip + pagination.limit,
      search: pagination.search,
      category: pagination.category,
    }));
  }

  resetFilter() {
    this.pagination.set({
      ...PAGINATION_DEFAULT,
      category: this.category(),
    });
    this.products.set([]);
  }
}

import { PaginationMetaData, Product, ProductCard } from '@/core/interfaces';

export function createPaginationMetaData(
  total: number,
  skip: number,
  limit: number
): PaginationMetaData {
  const page = Math.floor(skip / limit) + 1;
  const take = limit;
  const itemCount = total;
  const pageCount = Math.ceil(total / limit);
  const hasPreviousPage = page > 1;
  const hasNextPage = page < pageCount;

  return {
    page,
    take,
    itemCount,
    pageCount,
    hasPreviousPage,
    hasNextPage,
  };
}

export function toProductCard(product: Product): ProductCard {
  return {
    id: product.id,
    image: product.images.at(0) || '',
    name: product.title,
    description: product.description,
    price: product.price,
    rating: product.rating,
    stock: product.stock,
    tags: product.tags,
  };
}

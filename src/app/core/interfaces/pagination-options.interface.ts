export interface PaginationOptions {
  limit: number;
  skip: number;
  search: string;
  category?: string;
}

export interface PaginationMetaData {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PaginationResult<T> {
  data: T[];
  meta: PaginationMetaData;
}

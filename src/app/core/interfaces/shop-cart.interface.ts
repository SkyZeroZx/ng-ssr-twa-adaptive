import { ProductCard } from './product-card.interface';

export type ShopCart = ProductCard & { quantity: number };

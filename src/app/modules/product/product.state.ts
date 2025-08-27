import { ProductModel } from '@models/product.model';

export interface ProductState {
  products: ProductModel[];
  total: number;
}

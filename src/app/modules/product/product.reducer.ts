import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';
import { ProductState } from './product.state';

export const initialState: ProductState = {
  products: [],
  total: 0,
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.fetchAll, (state: ProductState) => ({
    ...state,
  })),

  on(ProductActions.fetchAllSuccess, (state: ProductState, { products, total }) => ({
    ...state,
    products: [...products],
    total: total,
  })),

  on(ProductActions.fetchAllError, (state: ProductState) => ({
    ...state,
  }))
);

import { createAction, props } from '@ngrx/store';

export enum ProductActionsType {
  PRODUCT_FETCH_ALL = '[Product] Fetch All',
  PRODUCT_FETCH_ALL_SUCCESS = '[Product] Fetch All Success',
  PRODUCT_FETCH_ALL_ERROR = '[Product] Fetch All Error',
}

export const fetchAll = createAction(ProductActionsType.PRODUCT_FETCH_ALL, (route?: string) => ({ route }));

export const fetchAllSuccess = createAction(
  ProductActionsType.PRODUCT_FETCH_ALL_SUCCESS,
  props<{ products: any[]; total: number; route?: string }>()
);

export const fetchAllError = createAction(ProductActionsType.PRODUCT_FETCH_ALL_ERROR, props<{ error: string }>());

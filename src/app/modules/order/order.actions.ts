import { createAction, props } from '@ngrx/store';

export enum OrderActionsType {
  ORDER_FETCH_ALL = '[Order] Fetch All',
  ORDER_FETCH_ALL_SUCCESS = '[Order] Fetch All Success',
  ORDER_FETCH_ALL_ERROR = '[Order] Fetch All Error',
}

export const fetchAll = createAction(OrderActionsType.ORDER_FETCH_ALL, (route?: string) => ({ route }));

export const fetchAllSuccess = createAction(
  OrderActionsType.ORDER_FETCH_ALL_SUCCESS,
  props<{ orders: any[]; total: number; route?: string }>()
);
export const fetchAllError = createAction(OrderActionsType.ORDER_FETCH_ALL_ERROR, props<{ error: string }>());

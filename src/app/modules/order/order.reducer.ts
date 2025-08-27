import { createReducer, on } from '@ngrx/store';
import * as OrderActions from './order.actions';
import { OrderState } from './order.state';

export const initialState: OrderState = {
  orders: [],
  total: 0,
};

export const orderReducer = createReducer(
  initialState,
  on(OrderActions.fetchAll, (state: OrderState) => ({
    ...state,
  })),

  on(OrderActions.fetchAllSuccess, (state: OrderState, { orders, total }) => ({
    ...state,
    orders: [...orders],
    total: total,
  })),

  on(OrderActions.fetchAllError, (state: OrderState) => ({
    ...state,
  }))
);

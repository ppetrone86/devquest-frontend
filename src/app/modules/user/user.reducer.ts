import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserState } from './user.state';

export const initialState: UserState = {
  users: [],
  total: 0,
  loaded: false,
  filters: {},
  sortField: '',
  sortOrder: '',
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.fetchAll, (state: UserState) => ({
    ...state,
    filters: state.filters,
    sortField: state.sortField,
    sortOrder: state.sortOrder,
    loaded: false,
  })),

  on(UserActions.fetchAllSuccess, (state: UserState, { users, total }) => ({
    ...state,
    users: [...users],
    total: total,
    loaded: true,
  })),

  on(UserActions.fetchAllError, (state: UserState) => ({
    ...state,
    loaded: false,
  })),

  on(UserActions.setUserFilters, (state: UserState, { filters }) => ({
    ...state,
    filters: { ...state.filters, ...filters },
  }))
);

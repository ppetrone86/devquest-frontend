import { createReducer, on } from '@ngrx/store';
import { GameState } from './game.state';
import * as UserActions from './user.actions';

export const initialState: GameState = {
  users: [],
  total: 0,
  loaded: false,
  filters: {},
  sortField: '',
  sortOrder: '',
};

export const gameReducer = createReducer(
  initialState,
  on(UserActions.fetchAll, (state: GameState) => ({
    ...state,
    filters: state.filters,
    sortField: state.sortField,
    sortOrder: state.sortOrder,
    loaded: false,
  })),

  on(UserActions.fetchAllSuccess, (state: GameState, { users, total }) => ({
    ...state,
    users: [...users],
    total: total,
    loaded: true,
  })),

  on(UserActions.fetchAllError, (state: GameState) => ({
    ...state,
    loaded: false,
  })),

  on(UserActions.setUserFilters, (state: GameState, { filters }) => ({
    ...state,
    filters: { ...state.filters, ...filters },
  }))
);

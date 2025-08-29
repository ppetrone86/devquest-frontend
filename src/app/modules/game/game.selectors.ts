import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GameState } from './game.state';

export const featureSelectorUsersState = createFeatureSelector<GameState>('userState');

export const selectorUserState = createSelector(featureSelectorUsersState, (state: GameState) => state);

export const selectorUserState_users = createSelector(featureSelectorUsersState, (state: GameState) => state.users);

export const selectorUserState_total = createSelector(featureSelectorUsersState, (state: GameState) => state.total);

export const selectorUserState_filters = createSelector(featureSelectorUsersState, (state: GameState) => state.filters);

export const selectUserById = (id: number) =>
  createSelector(selectorUserState_users, (users) => users.find((user) => user.id === id));

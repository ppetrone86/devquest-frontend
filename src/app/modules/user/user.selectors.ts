import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.state';

export const featureSelectorUsersState = createFeatureSelector<UserState>('userState');

export const selectorUserState = createSelector(featureSelectorUsersState, (state: UserState) => state);

export const selectorUserState_users = createSelector(featureSelectorUsersState, (state: UserState) => state.users);

export const selectorUserState_total = createSelector(featureSelectorUsersState, (state: UserState) => state.total);

export const selectorUserState_filters = createSelector(featureSelectorUsersState, (state: UserState) => state.filters);

export const selectUserById = (id: number) =>
  createSelector(selectorUserState_users, (users) => users.find((user) => user.id === id));

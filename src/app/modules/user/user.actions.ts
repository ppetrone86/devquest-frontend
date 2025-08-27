import { UserModel } from '@models/user.model';
import { UserService } from '@modules/user/user.service';
import { createAction, props } from '@ngrx/store';

export enum UserActionsType {
  USER_FETCH_ALL = '[User] Fetch All',
  USER_FETCH_ALL_SUCCESS = '[User] Fetch All Success',
  USER_FETCH_ALL_ERROR = '[User] Fetch All Error',
  USER_SET_FILTERS = '[User] SetFilters',
}

export const fetchAll = createAction(
  UserActionsType.USER_FETCH_ALL,
  props<{ filters?: Record<string, UserModel>; sortField?: string; sortOrder?: string }>()
);

export const fetchAllSuccess = createAction(
  UserActionsType.USER_FETCH_ALL_SUCCESS,
  props<{ users: UserModel[]; total: number; route?: string }>()
);

export const fetchAllError = createAction(UserActionsType.USER_FETCH_ALL_ERROR, props<{ error: string }>());

export const setUserFilters = createAction(
  UserActionsType.USER_SET_FILTERS,
  props<{ filters: Record<string, UserService> }>()
);

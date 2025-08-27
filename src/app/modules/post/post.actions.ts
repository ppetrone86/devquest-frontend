import { createAction, props } from '@ngrx/store';

export enum PostActionsType {
  POST_FETCH_ALL = '[Post] Fetch All',
  POST_FETCH_ALL_SUCCESS = '[Post] Fetch All Success',
  POST_FETCH_ALL_ERROR = '[Post] Fetch All Error',
}

export const fetchAll = createAction(PostActionsType.POST_FETCH_ALL, (route?: string) => ({ route }));
export const fetchAllSuccess = createAction(
  PostActionsType.POST_FETCH_ALL_SUCCESS,
  props<{ posts: any[]; total: number; route?: string }>()
);
export const fetchAllError = createAction(PostActionsType.POST_FETCH_ALL_ERROR, props<{ error: string }>());

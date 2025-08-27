import { createReducer, on } from '@ngrx/store';
import * as PostActions from './post.actions';
import { PostState } from './post.state';

export const initialState: PostState = {
  posts: [],
  total: 0,
};

export const postReducer = createReducer(
  initialState,
  on(PostActions.fetchAll, (state: PostState) => ({
    ...state,
  })),

  on(PostActions.fetchAllSuccess, (state: PostState, { posts, total }) => ({
    ...state,
    posts: [...posts],
    total: total,
  })),

  on(PostActions.fetchAllError, (state: PostState) => ({
    ...state,
  }))
);

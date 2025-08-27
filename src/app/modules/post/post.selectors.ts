import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from './post.state';

export const featureSelectorPostsState = createFeatureSelector<PostState>('postState');
export const selectorPostState = createSelector(featureSelectorPostsState, (state: PostState) => state);
export const selectorPostState_posts = createSelector(selectorPostState, (state: PostState) => state.posts);
export const selectorPostState_total = createSelector(featureSelectorPostsState, (state: PostState) => state.total);

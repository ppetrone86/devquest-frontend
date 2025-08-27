import { createReducer, on } from '@ngrx/store';
import { change, set } from './theme.actions';
import { ThemeKey, ThemeState } from './theme.state';

export const initialState: ThemeState = {
  key: ThemeKey.LIGHT,
};

export const themeReducer = createReducer(
  initialState,
  on(set, (_, { state }) => state),
  on(change, (state, { key }) => ({
    ...state,
    key,
  }))
);

import { createAction, props } from '@ngrx/store';
import { ThemeKey, ThemeState } from './theme.state';

export enum ThemeActionsType {
  THEME_INIT = '[Theme] Init',
  THEME_INFER = '[Theme] Infer',
  THEME_SET = '[Theme] Set',
  THEME_CHANGE = '[Theme] Change',
}

export const init = createAction(ThemeActionsType.THEME_INIT);

export const infer = createAction(ThemeActionsType.THEME_INFER);

export const set = createAction(ThemeActionsType.THEME_SET, props<{ state: ThemeState }>());

export const change = createAction(ThemeActionsType.THEME_CHANGE, props<{ key: ThemeKey }>());

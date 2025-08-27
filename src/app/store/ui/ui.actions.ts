import { createAction, props } from '@ngrx/store';

export enum UIActionsType {
  UI_SET_GLOBAL_MESSAGE = '[UI] Set Global Messag',
  UI_CLEAR_GLOBAL_MESSAGE = '[UI] lear Global Message',
}

export const setGlobalMessage = createAction(
  UIActionsType.UI_SET_GLOBAL_MESSAGE,
  props<{ messageType: 'error' | 'info' | 'warning' | 'success' | null; message: string }>()
);

export const clearGlobalMessage = createAction(UIActionsType.UI_CLEAR_GLOBAL_MESSAGE);

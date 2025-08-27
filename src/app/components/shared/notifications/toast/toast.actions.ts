import { ToastState } from '@components/shared/notifications/toast/toast.state';
import { createAction, props } from '@ngrx/store';

export enum ToastActionsType {
  TOAST_SHOW_INFO = '[Toast] Show Toast Info',
  TOAST_SHOW_SUCCESS = '[Toast] Show Toast Success',
  TOAST_SHOW_WARNING = '[Toast] Show Toast Warning',
  TOAST_SHOW_ERROR = '[Toast] Show Toast Error',
  TOAST_HIDE = '[Toast] Hide Toast',
}

export const showInfoToast = createAction(ToastActionsType.TOAST_SHOW_INFO, props<{ toast: ToastState }>());
export const showSuccessToast = createAction(ToastActionsType.TOAST_SHOW_SUCCESS, props<{ toast: ToastState }>());
export const showWarningToast = createAction(ToastActionsType.TOAST_SHOW_WARNING, props<{ toast: ToastState }>());
export const showErrorToast = createAction(ToastActionsType.TOAST_SHOW_ERROR, props<{ toast: ToastState }>());
export const hideToast = createAction(ToastActionsType.TOAST_HIDE);

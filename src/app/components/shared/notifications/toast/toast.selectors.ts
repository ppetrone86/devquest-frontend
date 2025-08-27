import { ToastState } from '@components/shared/notifications/toast/toast.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureSelectorToastState = createFeatureSelector<ToastState>('toastState');
export const selectorToastState = createSelector(featureSelectorToastState, (state: ToastState) => state);

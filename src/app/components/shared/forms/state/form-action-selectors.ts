import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FormActionState } from './form-action-state';

export const selectFormActionState = createFeatureSelector<FormActionState>('formActionState');

export const selectFormAction = createSelector(
  selectFormActionState,
  (state: FormActionState) => state?.action ?? null
);

import { createReducer, on } from '@ngrx/store';
import * as FormActions from './form-action-actions';
import { FormActionState } from './form-action-state';

export const initialFormActionState: FormActionState = {
  action: null,
};

const _formActionReducer = createReducer(
  initialFormActionState,
  on(FormActions.emitFormAction, (state, { action }) => ({
    ...state,
    action,
  }))
);

export function formActionReducer(state: any, action: any) {
  return _formActionReducer(state, action);
}

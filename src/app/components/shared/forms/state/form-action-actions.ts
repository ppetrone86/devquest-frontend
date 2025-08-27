import { createAction, props } from '@ngrx/store';
import { FormActionEvent } from '../models/form.model';

export enum FormActionType {
  EMIT_FORM_ACTION = '[Form] Emit Form Action',
}

export const emitFormAction = createAction(FormActionType.EMIT_FORM_ACTION, props<{ action: FormActionEvent }>());

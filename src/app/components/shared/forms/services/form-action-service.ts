import { inject, Injectable } from '@angular/core';
import * as FormActions from '@components/shared/forms/state/form-action-actions';
import { Store } from '@ngrx/store';
import { FormActionEvent } from '../models/form.model';

@Injectable({
  providedIn: 'root',
})
export class FormActionService {
  private _store = inject(Store);

  emitAction(action: FormActionEvent): void {
    this._store.dispatch(FormActions.emitFormAction({ action }));
  }
}

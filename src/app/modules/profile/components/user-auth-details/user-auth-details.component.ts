import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { FormComponent } from '@components/shared/forms/dynamic-form/dynamic-form.component';
import { ActionType, FieldType, FieldValidatorType, FormConfig } from '@components/shared/forms/models/form.model';
import { selectFormAction } from '@components/shared/forms/state/form-action-selectors';
import { ErrorConstants } from '@components/shared/notifications/error.contants';
import { Store } from '@ngrx/store';
import { LogService } from '@services/log.service';
import { distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-user-auth-details',
  imports: [FormComponent],
  templateUrl: './user-auth-details.component.html',
  styles: ``,
  standalone: true,
})
export class UserAuthDetailsComponent implements OnInit {
  private _store = inject(Store);
  private _fieldPrefix = 'components.userAuthDetails.fields.';

  formConfig: Signal<FormConfig> = signal({
    id: 'user-auth-details-form',
    title: 'components.userAuthDetails.form.title',
    subtitle: 'components.userAuthDetails.form.subtitle',
    fields: [
      {
        type: FieldType.TEXT,
        name: `username`,
        label: `${this._fieldPrefix}username.label`,
        placeholder: `${this._fieldPrefix}username.placeholder`,
        helpText: `${this._fieldPrefix}username.helpText`,
        value: '',
        validators: [{ type: FieldValidatorType.REQUIRED, message: ErrorConstants.REQUIRED }],
        asyncValidators: [
          {
            type: FieldValidatorType.ASYNC_REGEX_VALIDATION,
            value: '^[a-zA-Z0-9_.-]*$',
            message: 'common.fieldValidators.invalidUsername',
          },
        ],
      },
      {
        type: FieldType.PASSWORD,
        name: `password`,
        label: `${this._fieldPrefix}password.label`,
        placeholder: `${this._fieldPrefix}password.placeholder`,
        helpText: `${this._fieldPrefix}password.helpText`,
        value: '',
        validators: [{ type: FieldValidatorType.REQUIRED, message: ErrorConstants.REQUIRED }],
      },
      {
        type: FieldType.PASSWORD,
        name: `confirm-password`,
        label: `${this._fieldPrefix}confirmPassword.label`,
        placeholder: `${this._fieldPrefix}confirmPassword.placeholder`,
        helpText: `${this._fieldPrefix}confirmPassword.helpText`,
        value: '',
        validators: [{ type: FieldValidatorType.REQUIRED, message: ErrorConstants.REQUIRED }],
        asyncValidators: [{ type: FieldValidatorType.ASYNC_PASSWORD_MISS_MATCH, compareTo: 'password' }],
      },
    ],
    actions: [
      {
        type: ActionType.SUBMIT,
        label: 'common.actions.submit.title',
        actionUrl: '/profile/reset-password',
      },
      {
        type: ActionType.RESET,
        label: 'common.actions.reset.title',
      },
    ],
  });

  ngOnInit(): void {
    this._store
      .select(selectFormAction)
      .pipe(
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
        filter((action) => action?.formId === this.formConfig().id && action?.actionType === ActionType.SUBMIT)
      )
      .subscribe((action) => {
        if (action?.actionType === ActionType.SUBMIT) {
          LogService.debug('UserAuthDetailsComponent.onFormAction.action', action);
        }
      });
  }
}

import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { FormComponent } from '@components/shared/forms/dynamic-form/dynamic-form.component';
import { ActionType, FieldType, FieldValidatorType, FormConfig } from '@components/shared/forms/models/form.model';
import { selectFormAction } from '@components/shared/forms/state/form-action-selectors';
import { ErrorConstants } from '@components/shared/notifications/error.contants';
import { Store } from '@ngrx/store';
import { LogService } from '@services/log.service';
import { distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-user-details',
  imports: [FormComponent],
  templateUrl: './user-details.component.html',
  styles: ``,
  standalone: true,
})
export class UserDetailsComponent implements OnInit {
  private _store = inject(Store);
  private _fieldPrefix = 'components.userDetails.fields.';

  formConfig: Signal<FormConfig> = signal({
    id: 'user-details-form',
    title: 'components.userDetails.form.title',
    subtitle: 'components.userDetails.form.subtitle',
    columns: {
      md: 2,
      xl: 2,
      '2xl': 2,
    },
    fields: [
      {
        type: FieldType.TEXT,
        name: `firstname`,
        label: `${this._fieldPrefix}firstname.label`,
        placeholder: `${this._fieldPrefix}firstname.placeholder`,
        helpText: `${this._fieldPrefix}firstname.helpText`,
        value: '',
        validators: [{ type: FieldValidatorType.REQUIRED, message: ErrorConstants.REQUIRED }],
      },
      {
        type: FieldType.TEXT,
        name: `lastname`,
        label: `${this._fieldPrefix}lastname.label`,
        placeholder: `${this._fieldPrefix}lastname.placeholder`,
        helpText: `${this._fieldPrefix}lastname.helpText`,
        value: '',
        validators: [{ type: FieldValidatorType.REQUIRED, message: ErrorConstants.REQUIRED }],
      },
      {
        type: FieldType.NUMBER,
        name: `age`,
        label: `${this._fieldPrefix}age.label`,
        placeholder: `${this._fieldPrefix}age.placeholder`,
        helpText: `${this._fieldPrefix}age.helpText`,
        value: '',
        validators: [
          { type: FieldValidatorType.REQUIRED, message: ErrorConstants.REQUIRED },
          { type: FieldValidatorType.MIN, value: 18, message: ErrorConstants.MIN },
          { type: FieldValidatorType.MAX, value: 70, message: ErrorConstants.MAX },
        ],
      },
      {
        type: FieldType.TEXT,
        name: `phone-number`,
        label: `${this._fieldPrefix}phoneNumber.placeholder`,
        placeholder: `${this._fieldPrefix}phoneNumber.placeholder`,
        helpText: `${this._fieldPrefix}phoneNumber.helpText`,
        value: '',
        validators: [{ type: FieldValidatorType.REQUIRED, message: ErrorConstants.REQUIRED }],
      },
      {
        columns: {
          md: 2,
          xl: 2,
        },
        type: FieldType.TEXT,
        name: `email`,
        label: `${this._fieldPrefix}email.label`,
        placeholder: `${this._fieldPrefix}email.placeholder`,
        helpText: `${this._fieldPrefix}email.helpText`,
        value: '',
        validators: [
          { type: FieldValidatorType.REQUIRED, message: ErrorConstants.REQUIRED },
          { type: FieldValidatorType.EMAIL, message: ErrorConstants.EMAIL },
        ],
      },
      {
        columns: {
          md: 2,
          xl: 2,
        },
        type: FieldType.TEXT,
        name: `confirm-email`,
        label: `${this._fieldPrefix}confirmEmail.placeholder`,
        placeholder: `${this._fieldPrefix}confirmEmail.placeholder`,
        helpText: `${this._fieldPrefix}confirmEmail.helpText`,
        value: '',
        validators: [
          { type: FieldValidatorType.REQUIRED, message: ErrorConstants.REQUIRED },
          { type: FieldValidatorType.EMAIL, message: ErrorConstants.EMAIL },
        ],
        asyncValidators: [{ type: FieldValidatorType.ASYNC_EMAIL_MISS_MATCH, compareTo: 'email' }],
      },
      {
        type: FieldType.TEXT,
        name: `address-street`,
        label: `${this._fieldPrefix}address.street.label`,
        placeholder: `${this._fieldPrefix}address.street.placeholder`,
        helpText: `${this._fieldPrefix}address.street.helpText`,
        value: '',
        validators: [{ type: FieldValidatorType.REQUIRED, message: ErrorConstants.REQUIRED }],
      },
      {
        type: FieldType.TEXT,
        name: `address-zip-code`,
        label: `${this._fieldPrefix}address.zipCode.label`,
        placeholder: `${this._fieldPrefix}address.zipCode.placeholder`,
        helpText: `${this._fieldPrefix}address.zipCode.helpText`,
        value: '',
        validators: [{ type: FieldValidatorType.REQUIRED, message: ErrorConstants.REQUIRED }],
      },
      {
        type: FieldType.TEXT,
        name: `address-city`,
        label: `${this._fieldPrefix}address.city.label`,
        placeholder: `${this._fieldPrefix}address.city.placeholder`,
        helpText: `${this._fieldPrefix}address.city.helpText`,
        value: '',
        validators: [{ type: FieldValidatorType.REQUIRED, message: ErrorConstants.REQUIRED }],
      },
      {
        type: FieldType.TEXT,
        name: `address-province`,
        label: `${this._fieldPrefix}address.province.label`,
        placeholder: `${this._fieldPrefix}address.province.placeholder`,
        helpText: `${this._fieldPrefix}address.province.helpText`,
        value: '',
        validators: [{ type: FieldValidatorType.REQUIRED, message: ErrorConstants.REQUIRED }],
      },
      {
        type: FieldType.TEXT,
        name: `address-country`,
        label: `${this._fieldPrefix}address.country.label`,
        placeholder: `${this._fieldPrefix}address.country.placeholder`,
        helpText: `${this._fieldPrefix}address.country.helpText`,
        value: '',
        validators: [{ type: FieldValidatorType.REQUIRED, message: ErrorConstants.REQUIRED }],
      },
    ],
    actions: [
      {
        type: ActionType.SUBMIT,
        label: 'common.actions.submit.title',
        actionUrl: '/profile',
      },
      {
        type: ActionType.RESET,
        label: 'common.actions.reset.title',
      },
    ],
    layout: {
      columns: 2,
    },
  });

  ngOnInit(): void {
    this._store
      .select(selectFormAction)
      .pipe(
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
        filter((action) => action?.formId === this.formConfig().id && action?.actionType === ActionType.SUBMIT)
      )
      .subscribe((action) => {
        LogService.debug('UserDetailsComponent.onFormAction.action', action);
      });
  }
}

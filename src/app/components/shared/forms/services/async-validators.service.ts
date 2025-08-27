import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { FieldAsyncValidator, FieldValidatorType } from '@components/shared/forms/models/form.model';
import { LogService } from '@services/log.service';
import { UtilsService } from '@services/utils.service';

@Injectable({
  providedIn: 'root',
})
export class AsyncValidatorsService {
  static getValidator(validator: FieldAsyncValidator): AsyncValidatorFn | null {
    switch (validator.type) {
      case FieldValidatorType.ASYNC_EMAIL_MISS_MATCH:
      case FieldValidatorType.ASYNC_PASSWORD_MISS_MATCH:
        return (control: AbstractControl) => this._checkFieldMatch(control, validator.compareTo, validator.type);
      case FieldValidatorType.ASYNC_REGEX_VALIDATION:
        return (control: AbstractControl) => this._checkRegexMatch(control, validator.value as string, validator.type);
      default:
        return null;
    }
  }

  private static async _checkFieldMatch(
    control: AbstractControl,
    compareTo: string | undefined,
    errorKey: string
  ): Promise<ValidationErrors | null> {
    if (!compareTo) {
      LogService.warn(`Async validator "${errorKey}" is missing a compareTo field.`);
      return null;
    }

    const compareValue: string = control.parent?.get(compareTo)?.value || '';
    return UtilsService.checkStringIsEqual(compareValue, control.value) ? null : { [errorKey]: true };
  }

  private static async _checkRegexMatch(
    control: AbstractControl,
    regexPattern: string,
    errorKey: string
  ): Promise<ValidationErrors | null> {
    if (!regexPattern) {
      LogService.warn(`Async validator "${errorKey}" requires a regex pattern.`);
      return null;
    }
    return UtilsService.checkRegexMatch(regexPattern, control.value, errorKey);
  }
}

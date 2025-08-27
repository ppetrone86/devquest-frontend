import { AsyncValidatorFn, ValidatorFn, Validators } from '@angular/forms';
import {
  FieldAsyncValidator,
  FieldOption,
  FieldType,
  FieldValidator,
  FieldValidatorType,
} from '@components/shared/forms/models/form.model';
import { AsyncValidatorsService } from '@components/shared/forms/services/async-validators.service';
import { LogService } from '@services/log.service';

export class FieldBase<T> {
  value: T | undefined;
  type!: FieldType;
  name!: string;
  label!: string;
  placeholder?: string;
  options?: FieldOption[];
  validators?: ValidatorFn[];
  asyncValidators?: AsyncValidatorFn[];

  constructor(options: {
    value?: T;
    type: FieldType;
    name: string;
    label: string;
    placeholder?: string;
    options?: FieldOption[];
    validators?: FieldValidator[];
    asyncValidators?: FieldAsyncValidator[];
  }) {
    this.value = options.value;
    this.type = options.type;
    this.name = options.name;
    this.label = options.label;
    this.placeholder = options.placeholder;
    this.options = options.options;

    this.validators = this._getValidators(options.validators || []);
    this.asyncValidators = this._getAsyncValidators(options.asyncValidators || []);
  }

  private _getValidators(validators: FieldValidator[]): ValidatorFn[] {
    const angularValidators: ValidatorFn[] = [];

    validators.forEach((validator) => {
      switch (validator.type) {
        case FieldValidatorType.REQUIRED:
          angularValidators.push(Validators.required);
          break;
        case FieldValidatorType.PATTERN:
          if (typeof validator.value === 'string') {
            angularValidators.push(Validators.pattern(validator.value));
          }
          break;
        case FieldValidatorType.MIN_LENGTH:
        case FieldValidatorType.MAX_LENGTH:
        case FieldValidatorType.EMAIL:
        case FieldValidatorType.URL:
        case FieldValidatorType.FILE:
          if (this.type === FieldType.TEXT || this.type === FieldType.TEXTAREA || this.type === FieldType.EMAIL) {
            this._addTextValidator(validator, angularValidators);
          }
          break;
        case FieldValidatorType.MIN:
        case FieldValidatorType.MAX:
          if (this.type === FieldType.NUMBER) {
            this._addNumberValidator(validator, angularValidators);
          }
          break;
        case FieldValidatorType.DATE:
          if (this.type === FieldType.DATE || this.type === FieldType.DATE_TIME) {
            this._addDateValidator(validator, angularValidators);
          }
          break;
        default:
          LogService.warn(`Validator type "${validator.type}" not supported for field type "${this.type}".`);
      }
    });

    return angularValidators;
  }

  private _addTextValidator(validator: FieldValidator, validators: ValidatorFn[]) {
    switch (validator.type) {
      case FieldValidatorType.MIN_LENGTH:
        if (typeof validator.value === 'number') validators.push(Validators.minLength(validator.value));
        break;
      case FieldValidatorType.MAX_LENGTH:
        if (typeof validator.value === 'number') validators.push(Validators.maxLength(validator.value));
        break;
      case FieldValidatorType.EMAIL:
        validators.push(Validators.email);
        break;
      case FieldValidatorType.URL:
        LogService.warn('URL validation not yet implemented.');
        break;
      default:
        LogService.warn(`Unsupported text validator: ${validator.type}`);
    }
  }

  private _addNumberValidator(validator: FieldValidator, validators: ValidatorFn[]) {
    switch (validator.type) {
      case FieldValidatorType.MIN:
        if (typeof validator.value === 'number') validators.push(Validators.min(validator.value));
        break;
      case FieldValidatorType.MAX:
        if (typeof validator.value === 'number') validators.push(Validators.max(validator.value));
        break;
      default:
        LogService.warn(`Unsupported number validator: ${validator.type}`);
    }
  }

  private _addDateValidator(validator: FieldValidator, validators: ValidatorFn[]) {
    if (validator.type === FieldValidatorType.DATE) {
      validators.push((control) => (!isNaN(Date.parse(control.value)) ? null : { date: { valid: false } }));
    }
  }

  private _getAsyncValidators(fieldAsyncValidators: FieldAsyncValidator[]): AsyncValidatorFn[] {
    const asyncValidators: AsyncValidatorFn[] = [];
    fieldAsyncValidators.forEach((validator) => {
      const asyncValidator = AsyncValidatorsService.getValidator(validator);
      if (asyncValidator) {
        asyncValidators.push(asyncValidator);
      } else {
        LogService.debug(`Async validator type "${validator.type}" not supported.`);
      }
    });
    return asyncValidators;
  }

  public getValidators(): { validators: ValidatorFn[]; asyncValidators: AsyncValidatorFn[] } {
    return {
      validators: this.validators || [],
      asyncValidators: this.asyncValidators || [],
    };
  }
}

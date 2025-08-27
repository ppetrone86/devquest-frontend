import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldValidatorType, FormField } from '@components/shared/forms/models/form.model';

@Component({
  selector: 'app-abstract-field',
  imports: [],
  templateUrl: './abstract-field.component.html',
  standalone: true,
})
export class AbstractFieldComponent {
  @Input() model!: FormField;
  @Input() control!: FormControl;

  /**
   * Retrieves the value of a specific validator from the model's validators.
   * @param type The type of validator to extract (FieldValidatorType enum).
   * @returns The value of the validator if present, otherwise null.
   */
  getValidatorValue(type: FieldValidatorType): string | number | null {
    const validator = this.model.validators?.find((v) => v.type === type);
    return validator?.value ?? null;
  }

  /**
   * Checks if the model has a specific validator.
   * @param type The type of validator to check for (FieldValidatorType enum).
   * @returns True if the model has the validator, otherwise false.
   */
  hasValidator(type: FieldValidatorType): boolean {
    return this.model.validators?.some((v) => v.type === type) ?? false;
  }
}

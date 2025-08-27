import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FieldBase } from '@components/shared/forms/models/fieldBase.model';
import { FormField } from '@components/shared/forms/models/form.model';

@Injectable({
  providedIn: 'root',
})
export class FormControlService {
  /**
   * Converts an array of FormField objects into an Angular FormGroup.
   * @param fields - The array of FormField objects to process.
   * @returns A FormGroup containing the mapped FormControls.
   */
  toFormGroup(fields: FormField[]) {
    const formGroup: Record<string, FormControl> = {};
    fields.forEach((field: FormField) => {
      const fieldBase = new FieldBase({
        name: field.name,
        type: field.type,
        label: field.label,
        placeholder: field.placeholder,
        value: field.value,
        options: field.options,
        validators: field.validators,
        asyncValidators: field.asyncValidators,
      });
      const { validators, asyncValidators } = fieldBase.getValidators();
      formGroup[field.name] = new FormControl(fieldBase.value || '', validators, asyncValidators);
    });

    return new FormGroup(formGroup);
  }
}

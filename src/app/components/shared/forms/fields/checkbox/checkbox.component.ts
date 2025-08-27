import { Component } from '@angular/core';
import { AbstractFieldComponent } from '@components/shared/forms/fields/abstract-field/abstract-field.component';
import { TranslateModule } from '@ngx-translate/core';
import { Checkbox } from 'primeng/checkbox';
import { FieldValidatorType } from '../../models/form.model';
import { FieldWrapperComponent } from '../field-wrapper/field-wrapper.component';

@Component({
  selector: 'app-checkbox',
  imports: [Checkbox, FieldWrapperComponent, TranslateModule],
  templateUrl: './checkbox.component.html',
  standalone: true,
})
export class CheckboxComponent extends AbstractFieldComponent {
  /**
   * Determines if the checkbox should be in an indeterminate state.
   * @returns True if the control value is null; otherwise, false.
   */
  isIndeterminate(): boolean {
    return this.control.value === null || this.control.value === undefined;
  }

  get required(): boolean {
    return this.hasValidator(FieldValidatorType.REQUIRED);
  }
}

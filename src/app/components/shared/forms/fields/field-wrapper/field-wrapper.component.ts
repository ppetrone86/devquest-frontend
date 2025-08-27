import { Component, Input } from '@angular/core';
import { AbstractFieldComponent } from '@components/shared/forms/fields/abstract-field/abstract-field.component';
import { TranslateModule } from '@ngx-translate/core';
import { FieldValidatorType } from '../../models/form.model';
import { FieldErrorsComponent } from '../field-errors/field-errors.component';

@Component({
  selector: 'app-field-wrapper',
  imports: [FieldErrorsComponent, TranslateModule],
  templateUrl: './field-wrapper.component.html',
  standalone: true,
})
export class FieldWrapperComponent extends AbstractFieldComponent {
  @Input() noLabels = false;

  get required(): boolean {
    return this.hasValidator(FieldValidatorType.REQUIRED);
  }
}

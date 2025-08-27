import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AbstractFieldComponent } from '@components/shared/forms/fields/abstract-field/abstract-field.component';
import { FieldValidatorType } from '@components/shared/forms/models/form.model';
import { TranslateModule } from '@ngx-translate/core';
import { InputNumber } from 'primeng/inputnumber';
import { FieldWrapperComponent } from '../field-wrapper/field-wrapper.component';

@Component({
  selector: 'app-number-input',
  imports: [InputNumber, FormsModule, ReactiveFormsModule, TranslateModule, FieldWrapperComponent],
  templateUrl: './number-input.component.html',
  standalone: true,
})
export class NumberInputComponent extends AbstractFieldComponent {
  protected readonly fieldValidatorType = FieldValidatorType;
}

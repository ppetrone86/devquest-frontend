import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputText } from 'primeng/inputtext';
import { FieldValidatorType } from '../../models/form.model';
import { AbstractFieldComponent } from '../abstract-field/abstract-field.component';
import { FieldWrapperComponent } from '../field-wrapper/field-wrapper.component';

@Component({
  selector: 'app-text-input',
  imports: [InputText, ReactiveFormsModule, TranslateModule, FieldWrapperComponent],
  templateUrl: './text-input.component.html',
  standalone: true,
})
export class TextInputComponent extends AbstractFieldComponent {
  protected readonly fieldValidatorType = FieldValidatorType;
}

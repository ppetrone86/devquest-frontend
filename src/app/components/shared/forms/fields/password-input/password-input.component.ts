import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Password } from 'primeng/password';
import { FieldValidatorType } from '../../models/form.model';
import { AbstractFieldComponent } from '../abstract-field/abstract-field.component';
import { FieldWrapperComponent } from '../field-wrapper/field-wrapper.component';

@Component({
  selector: 'app-password-input',
  imports: [Password, ReactiveFormsModule, TranslateModule, FieldWrapperComponent],
  templateUrl: './password-input.component.html',
  standalone: true,
})
export class PasswordInputComponent extends AbstractFieldComponent {
  protected readonly fieldValidatorType = FieldValidatorType;
}

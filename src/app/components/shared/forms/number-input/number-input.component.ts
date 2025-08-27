import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AbstractFieldComponent } from '@components/shared/forms/abstract-field/abstract-field.component';
import { FieldErrorsComponent } from '@components/shared/forms/fields/field-errors/field-errors.component';
import { FieldValidatorType } from '@components/shared/forms/models/form.model';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'app-number-input',
  standalone: true,
  imports: [FieldErrorsComponent, FloatLabel, FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './number-input.component.html',
  styles: ``,
})
export class NumberInputComponent extends AbstractFieldComponent {
  protected readonly fieldValidatorType = FieldValidatorType;
}

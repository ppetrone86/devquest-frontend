import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AbstractFieldComponent } from '@components/shared/forms/abstract-field/abstract-field.component';
import { FieldErrorsComponent } from '@components/shared/forms/field-errors/field-errors.component';
import { FieldValidatorType } from '@models/form.model';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [FloatLabel, FormsModule, ReactiveFormsModule, NgClass, FieldErrorsComponent],
  templateUrl: './text-area.component.html',
})
export class TextAreaComponent extends AbstractFieldComponent {
  protected readonly fieldValidatorType = FieldValidatorType;
}

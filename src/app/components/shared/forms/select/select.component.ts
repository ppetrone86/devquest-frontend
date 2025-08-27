import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractFieldComponent } from '@components/shared/forms/abstract-field/abstract-field.component';
import { FieldErrorsComponent } from '@components/shared/forms/fields/field-errors/field-errors.component';
import { TranslateModule } from '@ngx-translate/core';
import { FloatLabel } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [FloatLabel, SelectModule, ReactiveFormsModule, NgClass, FieldErrorsComponent, TranslateModule],
  templateUrl: './select.component.html',
  styles: ``,
})
export class SelectComponent extends AbstractFieldComponent {}

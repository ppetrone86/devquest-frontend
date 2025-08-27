import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractFieldComponent } from '@components/shared/forms/fields/abstract-field/abstract-field.component';
import { TranslateModule } from '@ngx-translate/core';
import { Select } from 'primeng/select';
import { FieldWrapperComponent } from '../field-wrapper/field-wrapper.component';

@Component({
  selector: 'app-select',
  imports: [ReactiveFormsModule, TranslateModule, Select, FieldWrapperComponent],
  templateUrl: './select.component.html',
  standalone: true,
})
export class SelectComponent extends AbstractFieldComponent {}

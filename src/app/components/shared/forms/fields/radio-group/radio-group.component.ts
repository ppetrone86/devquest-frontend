import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractFieldComponent } from '@components/shared/forms/fields/abstract-field/abstract-field.component';
import { TranslateModule } from '@ngx-translate/core';
import { RadioButton } from 'primeng/radiobutton';
import { FieldWrapperComponent } from '../field-wrapper/field-wrapper.component';

@Component({
  selector: 'app-radio-group',
  imports: [ReactiveFormsModule, RadioButton, TranslateModule, FieldWrapperComponent],
  templateUrl: './radio-group.component.html',
  standalone: true,
})
export class RadioGroupComponent extends AbstractFieldComponent {}

import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractFieldComponent } from '@components/shared/forms/fields/abstract-field/abstract-field.component';
import { FieldValidatorType } from '@components/shared/forms/models/form.model';
import { TranslateModule } from '@ngx-translate/core';
import { Textarea } from 'primeng/textarea';
import { FieldWrapperComponent } from '../field-wrapper/field-wrapper.component';

@Component({
  selector: 'app-text-area',
  imports: [Textarea, ReactiveFormsModule, TranslateModule, FieldWrapperComponent],
  templateUrl: './text-area.component.html',
  standalone: true,
})
export class TextAreaComponent extends AbstractFieldComponent {
  protected readonly fieldValidatorType = FieldValidatorType;
}

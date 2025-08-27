import { booleanAttribute, Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractDateFieldComponent } from '@components/shared/forms/fields/abstract-date-field/abstract-date-field.component';
import { TranslateModule } from '@ngx-translate/core';
import { DatePicker } from 'primeng/datepicker';
import { FieldWrapperComponent } from '../field-wrapper/field-wrapper.component';

@Component({
  selector: 'app-date-time-input',
  imports: [DatePicker, ReactiveFormsModule, TranslateModule, FieldWrapperComponent],
  templateUrl: './date-time-input.component.html',
  standalone: true,
})
export class DateTimeInputComponent extends AbstractDateFieldComponent {
  @Input({ transform: booleanAttribute }) hideTime = false;
  @Input({ transform: booleanAttribute }) hideDate = false;
}

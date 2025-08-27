import { JsonPipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractFieldComponent } from '@components/shared/forms/abstract-field/abstract-field.component';
import { FieldErrorsComponent } from '@components/shared/forms/field-errors/field-errors.component';
import { TranslatePipe } from '@ngx-translate/core';
import { FloatLabel } from 'primeng/floatlabel';
import { RadioButton } from 'primeng/radiobutton';

@Component({
  selector: 'app-radio-group',
  standalone: true,
  imports: [FloatLabel, FieldErrorsComponent, ReactiveFormsModule, NgClass, RadioButton, JsonPipe, TranslatePipe],
  templateUrl: './radio-group.component.html',
  styles: ``,
})
export class RadioGroupComponent extends AbstractFieldComponent {
  categories: any[] = [
    { name: 'Accounting', key: 'A' },
    { name: 'Marketing', key: 'M' },
    { name: 'Production', key: 'P' },
    { name: 'Research', key: 'R' },
  ];
}

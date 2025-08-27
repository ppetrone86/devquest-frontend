import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AbstractFieldComponent } from '@components/shared/forms/fields/abstract-field/abstract-field.component';

@Component({
  selector: 'app-hidden-input',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './hidden-input.component.html',
  standalone: true,
})
export class HiddenInputComponent extends AbstractFieldComponent {}

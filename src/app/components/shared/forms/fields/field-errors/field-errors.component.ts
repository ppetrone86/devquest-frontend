import { Component, Input, OnInit, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-field-errors',
  imports: [TranslatePipe],
  templateUrl: './field-errors.component.html',
  styleUrl: './field-errors.component.scss',
  standalone: true,
})
export class FieldErrorsComponent implements OnInit {
  @Input() control!: FormControl;
  asyncErrors = signal<string[]>([]);

  ngOnInit(): void {
    this.control.statusChanges.subscribe((status) => {
      this._updateAsyncErrors();
    });
  }

  private _updateAsyncErrors() {
    const errors = this.control.errors || {};
    const asyncErrorKeys = Object.keys(errors).filter((key) => key.includes('async'));

    this.asyncErrors.set(asyncErrorKeys.map((key) => `common.fieldValidators.${key}`));
  }
}

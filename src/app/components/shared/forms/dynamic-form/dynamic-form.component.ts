import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, inject, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckboxComponent } from '@components/shared/forms/fields/checkbox/checkbox.component';
import { DateTimeInputComponent } from '@components/shared/forms/fields/date-time-input/date-time-input.component';
import { FileInputComponent } from '@components/shared/forms/fields/file-input/file-input.component';
import { HiddenInputComponent } from '@components/shared/forms/fields/hidden-input/hidden-input.component';
import { NumberInputComponent } from '@components/shared/forms/fields/number-input/number-input.component';
import { RadioGroupComponent } from '@components/shared/forms/fields/radio-group/radio-group.component';
import { SelectComponent } from '@components/shared/forms/fields/select/select.component';
import { TextAreaComponent } from '@components/shared/forms/fields/text-area/text-area.component';
import { TextInputComponent } from '@components/shared/forms/fields/text-input/text-input.component';
import {
  ActionType,
  FieldType,
  FormAction,
  FormConfig,
  ResponsiveFormColumns,
} from '@components/shared/forms/models/form.model';
import { FormControlService } from '@components/shared/forms/services/form-control.service';
import { TranslateModule } from '@ngx-translate/core';
import { LogService } from '@services/log.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PasswordInputComponent } from '../fields/password-input/password-input.component';
import { FormActionService } from '../services/form-action-service';

@Component({
  selector: 'app-dynamic-form',
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TranslateModule,
    TextInputComponent,
    PasswordInputComponent,
    TextAreaComponent,
    NumberInputComponent,
    DateTimeInputComponent,
    FileInputComponent,
    SelectComponent,
    RadioGroupComponent,
    CheckboxComponent,
    HiddenInputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
  standalone: true,
})
export class FormComponent implements OnChanges {
  @Input() model!: FormConfig | null;
  @Input({ transform: booleanAttribute }) hideCard?: boolean = false;

  private _formControlService: FormControlService = inject(FormControlService);
  private _router: Router = inject(Router);
  private _formActionService = inject(FormActionService);

  protected readonly fieldType = FieldType;

  form = signal<FormGroup>(new FormGroup({}));
  config = signal<FormConfig | null>(null);

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.model) {
      this.config.set(this.model);
      this._build();
    }
  }

  private _getColumns(columns: number | Partial<ResponsiveFormColumns> = 1): ResponsiveFormColumns {
    if (typeof columns === 'number') {
      return { xs: columns, sm: columns, md: columns, lg: columns, xl: columns, '2xl': columns };
    } else {
      const keys = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as (keyof ResponsiveFormColumns)[];
      const output: Partial<ResponsiveFormColumns> = {};
      let latestValue = 1;
      for (const key of keys) {
        if (columns?.[key]) {
          latestValue = columns[key];
        }
        output[key] = latestValue;
      }
      return output as ResponsiveFormColumns;
    }
  }

  getColumnsStyle(prefix: string, input?: number | Partial<ResponsiveFormColumns>): Record<string, number> {
    const columns = this._getColumns(input);
    const output: Record<string, number> = {};
    for (const [key, value] of Object.entries(columns)) {
      output[`--${prefix}-${key}`] = value;
    }
    return output;
  }

  private _build() {
    this.form.set(this._formControlService.toFormGroup(this.config()?.fields ?? []));

    /*
    if (this.form().get('confirm-email')) {
      this.form().get('confirm-email')?.setAsyncValidators(this.checkEmail.bind(this));
    }

    if (this.form().get('confirm-password')) {
      this.form().get('confirm-password')?.setAsyncValidators(this.checkPassword.bind(this));
    }*/
  }

  /*
  async checkEmail(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise<ValidationErrors | null>((resolve) => {
      const password: string = this.form().get('email')?.value || '';
      if (!this._utilsService.checkStringIsEqual(password, control.value)) {
        resolve({ emailMissMatch: true });
      } else {
        resolve(null);
      }
    });
  }

  async checkPassword(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise<ValidationErrors | null>((resolve) => {
      const password: string = this.form().get('password')?.value || '';
      if (!this._utilsService.checkStringIsEqual(password, control.value)) {
        resolve({ passwordMissMatch: true });
      } else {
        resolve(null);
      }
    });
  }
  */

  getControl(name: string): FormControl {
    return this.form().get(name) as FormControl;
  }

  onActionClick(action: FormAction): void {
    const actionHandlers: Record<ActionType, () => void> = {
      [ActionType.BUTTON]: () => this._submitForm(action),
      [ActionType.SUBMIT]: () => this._submitForm(action),
      [ActionType.RESET]: () => this._resetForm(),
      [ActionType.LINK]: () => this._navigateToLink(action),
    };

    const handler = actionHandlers[action.type];
    if (handler) {
      handler();
    } else {
      LogService.warn(`No handler defined for action type: ${action.type}`);
    }
  }

  private _submitForm(action: FormAction) {
    const httpMethod = action.type === ActionType.SUBMIT ? 'post' : 'put';

    this._formActionService.emitAction({
      actionType: action.type,
      actionUrl: action.actionUrl || '',
      formId: this.config()?.id,
      formData: this.form().value,
      httpMethod: httpMethod,
    });
  }

  private _resetForm() {
    this.form().reset();
    this.form().clearValidators();
    this.form().clearAsyncValidators();
  }

  private _navigateToLink(action: FormAction): void {
    if (action.routeUrl) {
      this._router.navigate(['/' + action.routeUrl]);
    } else {
      LogService.warn('Route URL is missing for LINK action.');
    }
  }
}

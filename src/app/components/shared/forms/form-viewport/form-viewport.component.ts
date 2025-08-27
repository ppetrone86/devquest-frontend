import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { FormComponent } from '@components/shared/forms/dynamic-form/dynamic-form.component';
import { ActionType, FormConfig, FormField } from '@components/shared/forms/models/form.model';
import { FormService } from '@components/shared/forms/services/form.service';
import { selectFormAction } from '@components/shared/forms/state/form-action-selectors';
import { Store } from '@ngrx/store';
import { LogService } from '@services/log.service';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-form-viewport',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormComponent],
  templateUrl: './form-viewport.component.html',
  styles: ``,
  standalone: true,
})
export class FormViewportComponent<T> implements OnInit {
  protected formConfig = signal<FormConfig | null>(null);
  private _formService: FormService = inject(FormService);
  private _store = inject(Store);
  private _entity = signal<string>('');
  private _data = signal<T | null>(null);

  @Input()
  set entity(value: string) {
    this._entity.set(value);
    this._loadForm(value);
  }

  @Input() inputData?: T;
  @Input({ transform: booleanAttribute }) hideCard = false;

  constructor() {
    effect(() => {
      this._entity();

      if (this.inputData) {
        this._data.set(this.inputData);
        this._populateForm(this.inputData);
      }
    });
  }

  ngOnInit(): void {
    this._store
      .select(selectFormAction)
      .pipe(
        distinctUntilChanged((prev, curr) => {
          return JSON.stringify(prev) == JSON.stringify(curr);
        })
      )
      .subscribe((action) => {
        if (action?.actionType === ActionType.SUBMIT) {
          LogService.debug('FormViewportComponent.onFormAction.action', action);
        }
      });
  }

  private _loadForm(entity: string) {
    if (!entity) return;

    this._formService.get(entity).subscribe({
      next: (fc: FormConfig) => {
        this.formConfig.set(fc);
      },
      error: (err) => LogService.debug('Error loading form config:', err),
    });
  }

  private _populateForm(formData: object) {
    const formConfig = this.formConfig();
    if (!formConfig || !Array.isArray(formConfig.fields)) {
      LogService.debug('Invalid form configuration');
      return;
    }

    const updatedFields: FormField[] = formConfig.fields.map((field) => {
      let value: any = '';

      if (field.name.includes('-')) {
        const keys = field.name.split('-');
        const lastKey = keys.pop();

        const nestedObject = keys.reduce((obj: any, key: string) => obj?.[key], formData);

        value = nestedObject ? nestedObject[lastKey as keyof typeof nestedObject] : '';
      } else {
        value = formData[field.name as keyof object] || '';
      }

      return {
        ...field,
        value: value || '',
      };
    });

    const newFormConfig: FormConfig = {
      ...formConfig,
      fields: updatedFields,
    };

    this.formConfig = signal(newFormConfig);
  }
}

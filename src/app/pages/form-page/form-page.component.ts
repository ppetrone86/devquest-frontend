import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { FormViewportComponent } from '@components/shared/forms/form-viewport/form-viewport.component';

@Component({
  selector: 'app-form-page',
  imports: [FormViewportComponent],
  templateUrl: './form-page.component.html',
  styles: ``,
  standalone: true,
})
export default class FormPageComponent {
  private _route = inject(ActivatedRoute);
  private _paramMap = toSignal(this._route.paramMap);

  entity = computed(() => {
    return this._paramMap()?.get('entity') ?? '';
  });

  constructor() {
    effect(() => {
      this.entity();
    });
  }
}

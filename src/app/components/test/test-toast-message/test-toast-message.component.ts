import { Component, inject } from '@angular/core';
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
  showWarningToast,
} from '@components/shared/notifications/toast/toast.actions';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-test-toast-message',
  imports: [ButtonModule],
  template: `
    <h4> Toast</h4>
    <div class="card justify-content-center flex gap-2">
      <p-button type="button" (onClick)="showAll()" label="Show all" severity="contrast" />
      <p-button type="button" (onClick)="showSuccess()" label="Success" severity="success" />
      <p-button type="button" (onClick)="showInfo()" label="Info" severity="info" />
      <p-button type="button" (onClick)="showWarn()" label="Warn" severity="warn" />
      <p-button type="button" (onClick)="showError()" label="Error" severity="danger" />
    </div>
  `,
  styles: ``,
  standalone: true,
})
export class TestToastMessageComponent {
  private _store: Store = inject(Store);

  showAll() {
    this.showSuccess();
    this.showInfo();
    this.showWarn();
    this.showError();
  }

  showSuccess() {
    this._store.dispatch(
      showSuccessToast({
        toast: {
          detail: 'messages.detail.success',
          position: 'top-right',
        },
      })
    );
  }

  showInfo() {
    this._store.dispatch(
      showInfoToast({
        toast: {
          detail: 'messages.detail.info',
          position: 'top-left',
        },
      })
    );
  }

  showWarn() {
    this._store.dispatch(
      showWarningToast({
        toast: {
          detail: 'messages.detail.warning',
          position: 'bottom-right',
        },
      })
    );
  }

  showError() {
    this._store.dispatch(
      showErrorToast({
        toast: {
          detail: 'messages.detail.error',
          position: 'bottom-left',
        },
      })
    );
  }
}

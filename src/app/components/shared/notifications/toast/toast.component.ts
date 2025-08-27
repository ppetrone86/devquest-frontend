import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { NotificationService } from '@components/shared/notifications/notification.service';
import { hideToast } from '@components/shared/notifications/toast/toast.actions';
import { selectorToastState } from '@components/shared/notifications/toast/toast.selectors';
import { Store } from '@ngrx/store';
import { ToastModule, ToastPositionType } from 'primeng/toast';

@Component({
  selector: 'app-toast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <p-toast key="toast" [position]="position" (onClose)="onClose()"></p-toast>`,
  imports: [ToastModule],
  standalone: true,
})
export class ToastComponent implements OnInit {
  private _store: Store = inject(Store);
  private _notificationService: NotificationService = inject(NotificationService);

  public position!: ToastPositionType;

  ngOnInit(): void {
    this._store.select(selectorToastState).subscribe({
      next: (data) => {
        if (data.show) {
          this.position = data.position || 'top-right';
          this._notificationService.translateAndShow(data);
        }
      },
    });
  }

  onClose(): void {
    this._store.dispatch(hideToast());
  }
}

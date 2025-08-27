import { inject, Injectable } from '@angular/core';
import { NotificationConstants, SeverityType } from '@components/shared/notifications/notification.constants';
import { NotificationState } from '@components/shared/notifications/notification.state';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private _translateService: TranslateService = inject(TranslateService);
  private _messageService: MessageService = inject(MessageService);

  private readonly _validSeverities = new Set<SeverityType>([
    NotificationConstants.SEVERITY_SUCCESS,
    NotificationConstants.SEVERITY_WARNING,
    NotificationConstants.SEVERITY_ERROR,
    NotificationConstants.SEVERITY_INFO,
  ]);

  translateAndShow(notification: NotificationState): void {
    const { summary, detail } = this._translateNotification(notification);
    this._show({ ...notification, summary, detail });
  }

  private _translateNotification(notification: NotificationState) {
    const severity = this._getSeverity(notification.severity);
    const summary = this._translate(notification.summary, NotificationConstants.DEFAULT_SUMMARY, severity);
    const detail = this._translate(notification.detail, NotificationConstants.DEFAULT_DETAIL, severity);
    return { summary, detail };
  }

  private _show(notification: NotificationState) {
    this._messageService.add(notification);
  }

  private _translate(text: string | undefined, defaults: Record<SeverityType, string>, severity: SeverityType): string {
    return this._translateService.instant(text || defaults[severity]);
  }

  private _getSeverity(severity: string | undefined): SeverityType {
    return this._validSeverities.has(severity as SeverityType)
      ? (severity as SeverityType)
      : NotificationConstants.SEVERITY_INFO;
  }
}

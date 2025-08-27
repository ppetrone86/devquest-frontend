import { NotificationState } from '@components/shared/notifications/notification.state';
import { ToastPositionType } from 'primeng/toast';

export interface ToastState extends NotificationState {
  position?: ToastPositionType;
}

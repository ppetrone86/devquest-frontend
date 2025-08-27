import { ToastMessageOptions } from 'primeng/api';

export interface NotificationState extends ToastMessageOptions {
  show?: boolean;
}

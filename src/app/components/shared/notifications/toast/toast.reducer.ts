import { NotificationConstants } from '@components/shared/notifications/notification.constants';
import { ToastState } from '@components/shared/notifications/toast/toast.state';
import { createReducer, on } from '@ngrx/store';
import { hideToast, showErrorToast, showInfoToast, showSuccessToast, showWarningToast } from './toast.actions';

export const initialState: ToastState = {
  severity: '',
  summary: '',
  detail: '',
  life: 2500,
  show: false,
  position: 'top-right',
  key: 'toast',
};

export const toastReducer = createReducer(
  initialState,
  on(showInfoToast, (state, { toast }) => ({
    ...state,
    ...toast,
    show: true,
    severity: NotificationConstants.SEVERITY_INFO,
    summary: toast.summary || NotificationConstants.DEFAULT_SUMMARY[NotificationConstants.SEVERITY_INFO],
    detail: toast.detail || NotificationConstants.DEFAULT_DETAIL[NotificationConstants.SEVERITY_INFO],
  })),

  on(showSuccessToast, (state, { toast }) => ({
    ...state,
    ...toast,
    show: true,
    severity: NotificationConstants.SEVERITY_SUCCESS,
    summary: toast.summary || NotificationConstants.DEFAULT_SUMMARY[NotificationConstants.SEVERITY_SUCCESS],
    detail: toast.detail || NotificationConstants.DEFAULT_DETAIL[NotificationConstants.SEVERITY_SUCCESS],
  })),

  on(showWarningToast, (state, { toast }) => ({
    ...state,
    ...toast,
    show: true,
    severity: NotificationConstants.SEVERITY_WARNING,
    summary: toast.summary || NotificationConstants.DEFAULT_SUMMARY[NotificationConstants.SEVERITY_WARNING],
    detail: toast.detail || NotificationConstants.DEFAULT_DETAIL[NotificationConstants.SEVERITY_WARNING],
  })),

  on(showErrorToast, (state, { toast }) => ({
    ...state,
    ...toast,
    show: true,
    severity: NotificationConstants.SEVERITY_ERROR,
    summary: toast.summary || NotificationConstants.DEFAULT_SUMMARY[NotificationConstants.SEVERITY_ERROR],
    detail: toast.detail || NotificationConstants.DEFAULT_DETAIL[NotificationConstants.SEVERITY_ERROR],
  })),

  on(hideToast, () => initialState)
);

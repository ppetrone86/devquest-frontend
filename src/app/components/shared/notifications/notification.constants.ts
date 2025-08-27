export type SeverityType = 'success' | 'warn' | 'error' | 'info';

export class NotificationConstants {
  static readonly SEVERITY_SUCCESS: SeverityType = 'success';
  static readonly SEVERITY_WARNING: SeverityType = 'warn';
  static readonly SEVERITY_ERROR: SeverityType = 'error';
  static readonly SEVERITY_INFO: SeverityType = 'info';

  static readonly DEFAULT_SUMMARY: Record<SeverityType, string> = {
    success: 'messages.summary.success',
    warn: 'messages.summary.warning',
    error: 'messages.summary.error',
    info: 'messages.summary.info',
  };

  static readonly DEFAULT_DETAIL: Record<SeverityType, string> = {
    success: 'messages.detail.success',
    warn: 'messages.detail.warning',
    error: 'messages.detail.error',
    info: 'messages.detail.info',
  };
}

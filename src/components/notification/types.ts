export enum NotificationTypes {
  info = 'info',
  success = 'success',
  warning = 'warning',
  error = 'error',
  custom = 'custom',
}

export interface NotificationOptions {
  title?: string;
  message: string;
  type: NotificationTypes;
  closeable?: boolean;
  duration?: number;
  icon?: string;
}

export interface Notification extends NotificationOptions {
  id: string;
  timer: ReturnType<typeof setTimeout>;
}

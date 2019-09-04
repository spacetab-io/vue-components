import { NOTIFICATION_TYPES } from './script';

export interface NotificationOptions {
  title?: string;
  message: string;
  type: NOTIFICATION_TYPES;
  closeable?: boolean;
  duration?: number;
  icon?: string;
}

export interface Notification extends NotificationOptions {
  id: string;
  timer: ReturnType<typeof setTimeout>;
}

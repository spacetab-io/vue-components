import Vue from 'vue';

import { NOTIFICATIONS_GROUP_ID } from '../notifications-group/script';
import StNotification from './index.vue';
import { NotificationOptions } from './types';

const NotificationComponent = Vue.extend(StNotification);

let notificationId = 0;

class NotificationService {
  constructor(options: NotificationOptions) {
    if (NotificationService.notificationsGroupElement) {
      this.create(options);
    }
  }

  private static get notificationsGroupElement() {
    return document.getElementById(NOTIFICATIONS_GROUP_ID);
  }

  create(options: NotificationOptions) {
    const instance = new NotificationComponent({
      propsData: {
        ...options,
        id: `st-notification-item-${notificationId++}`,
      },
    });
    const notification = instance.$mount();
    const notificationsGroup = NotificationService.notificationsGroupElement;

    if (notificationsGroup) {
      notificationsGroup.appendChild(notification.$el);
    }
    notification.$on('close', () => {
      notification.$el.remove();
    });
    return notification;
  }
}

export const StNotificationService = (options: NotificationOptions) => new NotificationService(options);

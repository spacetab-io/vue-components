import {
  Component,
  Prop,
  toNative,
  Vue,
} from 'vue-facing-decorator';

import { NotificationsGroupPosition } from './types';

export const NOTIFICATIONS_GROUP_ID = 'st-notifications-group';


@Component({
  name: 'StNotificationsGroup',
})
class StNotificationsGroup extends Vue {
  @Prop({ type: String, default: NotificationsGroupPosition.bottomRight })
  position!: NotificationsGroupPosition;

  @Prop({ type: Boolean, default: false })
  forcePermission!: boolean;

  get id(): string {
    return NOTIFICATIONS_GROUP_ID;
  }

  mounted() {
    if (this.forcePermission) {
      Notification.requestPermission();
    }
  }
}

export default toNative(StNotificationsGroup);
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';

import { NotificationsGroupPosition } from './types';

export const NOTIFICATIONS_GROUP_ID = 'st-notifications-group';


@Component({
  name: 'StNotificationsGroup',
})
export default class StNotificationsGroup extends Vue {
  @Prop({ type: String, default: NotificationsGroupPosition.bottomRight })
  position!: NotificationsGroupPosition;

  get id(): string {
    return NOTIFICATIONS_GROUP_ID;
  }
}

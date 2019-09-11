import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';

import { NOTIFICATIONS_GROUP_POSITION } from './types';

export const NOTIFICATIONS_GROUP_ID = 'st-notifications-group';


@Component({
  name: 'StNotificationsGroup',
})
export default class StNotificationsGroup extends Vue {
  @Prop({ type: String, default: NOTIFICATIONS_GROUP_POSITION.BOTTOM_RIGHT })
  position!: NOTIFICATIONS_GROUP_POSITION;

  get id(): string {
    return NOTIFICATIONS_GROUP_ID;
  }
}

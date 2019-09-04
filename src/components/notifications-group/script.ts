import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';

export const NOTIFICATIONS_GROUP_ID = 'st-notifications-group';


@Component({
  name: 'StNotificationsGroup',
})
export default class StNotificationsGroup extends Vue {
  @Prop({ type: String, default: 'bottom-right' })
  position!: string;

  get id(): string {
    return NOTIFICATIONS_GROUP_ID;
  }
}

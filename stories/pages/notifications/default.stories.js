import { storiesOf } from '@storybook/vue'
import {
  boolean,
  text,
  select,
  number,
} from '@storybook/addon-knobs';
import { template } from '../../templates/notifications/default.template';
import notificationsDocumentation from '../../documentation/notifications.md'
import {
  iconsList,
  withoutCustomEntity,
} from '../../utils/props-options';
import { NOTIFICATION_TYPES } from '../../../src/components/notification/types';
import { NOTIFICATIONS_GROUP_POSITION } from '../../../src/components/notifications-group/types';


storiesOf('Components|Notifications', module).add('Default', () => ({
  template,
  props: {
    position: {
      default: select('Position', Object.values(NOTIFICATIONS_GROUP_POSITION), NOTIFICATIONS_GROUP_POSITION.BOTTOM_RIGHT),
    },
    type: {
      default: select('Type', withoutCustomEntity(Object.values(NOTIFICATION_TYPES)), NOTIFICATION_TYPES.INFO),
    },
    title: {
      default: text('Title', 'Notification title'),
    },
    message: {
      default: text('Message', 'Notification message'),
    },
    closeable: {
      default: boolean('Closeable', true),
    },
    duration: {
      default: number('Duration', 4500),
    },
    icon: {
      default: select('Icon', iconsList, iconsList[0]),
    },
  },
  data() {
    return {}
  },
  methods: {
    callNotification() {
      this.$stNotification({
        type: this.type,
        title: this.title,
        message: this.message,
        closeable: this.closeable,
        duration: this.duration,
        icon: this.icon,
      });
    }
  }
}), {
  notes: { markdown: notificationsDocumentation },
});

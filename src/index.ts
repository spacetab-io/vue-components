import { VueConstructor } from 'vue';

import StBadge from './components/badge/index.vue';
import StButtonGroup from './components/button-group/index.vue';
import StButton from './components/button/index.vue';
import StCheckbox from './components/checkbox/index.vue';
import StCol from './components/col/index.vue';
import StIcon from './components/icon/index.vue';
import StInput from './components/input/index.vue';
import { StNotificationService } from './components/notification/service';
import StNotificationsGroup from './components/notifications-group/index.vue';
import StPagination from './components/pagination/index.vue';
import StPopover from './components/popover/index.vue';
import StRow from './components/row/index.vue';
import StTextarea from './components/textarea/index.vue';

const install = (Vue: VueConstructor) => {
  Vue.component('st-badge', StBadge);
  Vue.component('st-button', StButton);
  Vue.component('st-button-group', StButtonGroup);
  Vue.component('st-checkbox', StCheckbox);
  Vue.component('st-col', StCol);
  Vue.component('st-icon', StIcon);
  Vue.component('st-input', StInput);
  Vue.component('st-notifications-group', StNotificationsGroup);
  Vue.component('st-popover', StPopover);
  Vue.component('st-row', StRow);
  Vue.component('st-textarea', StTextarea);
  Vue.component('st-pagination', StPagination);

  /* eslint-disable-next-line no-param-reassign */
  Vue.prototype.$stNotification = StNotificationService;
};

export default {
  install,
  StBadge,
  StButton,
  StButtonGroup,
  StCheckbox,
  StCol,
  StIcon,
  StInput,
  StNotificationsGroup,
  StPopover,
  StRow,
  StTextarea,
  StPagination,
};

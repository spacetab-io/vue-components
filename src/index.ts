import { VueConstructor } from 'vue';

import StBadge from './components/badge/index.vue';
import StButtonGroup from './components/button-group/index.vue';
import StButton from './components/button/index.vue';
import StCheckbox from './components/checkbox/index.vue';
import StCol from './components/col/index.vue';
import StCollapser from './components/collapser/index.vue';
import StInlineDatepicker from './components/datepicker/index.vue';
import StIcon from './components/icon/index.vue';
import StInput from './components/input/index.vue';
import { StNotificationService } from './components/notification/service';
import StNotificationsGroup from './components/notifications-group/index.vue';
import StPagination from './components/pagination/index.vue';
import StPopper from './components/popper/index.vue';
import StRadio from './components/radio/index.vue';
import StRow from './components/row/index.vue';
import StScrollbar from './components/scrollbar/index.vue';
import StSelect from './components/select/index.vue';
import StSwitch from './components/switch/index.vue';
import StTable from './components/table/index.vue';
import StTabsCollapsed from './components/tabs-collapsed/index.vue';
import StTabs from './components/tabs/index.vue';
import StTextarea from './components/textarea/index.vue';

const install = (Vue: VueConstructor) => {
  Vue.component('st-badge', StBadge);
  Vue.component('st-button', StButton);
  Vue.component('st-button-group', StButtonGroup);
  Vue.component('st-checkbox', StCheckbox);
  Vue.component('st-col', StCol);
  Vue.component('st-collapser', StCollapser);
  Vue.component('st-datepicker', StInlineDatepicker);
  Vue.component('st-icon', StIcon);
  Vue.component('st-input', StInput);
  Vue.component('st-notifications-group', StNotificationsGroup);
  Vue.component('st-row', StRow);
  Vue.component('st-textarea', StTextarea);
  Vue.component('st-radio', StRadio);
  Vue.component('st-pagination', StPagination);
  Vue.component('st-popper', StPopper);
  Vue.component('st-select', StSelect);
  Vue.component('st-scrollbar', StScrollbar);
  Vue.component('st-switch', StSwitch);
  Vue.component('st-table', StTable);
  Vue.component('st-tabs', StTabs);
  Vue.component('st-tabs-collapsed', StTabsCollapsed);

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
  StCollapser,
  StInlineDatepicker,
  StIcon,
  StInput,
  StNotificationsGroup,
  StRow,
  StTextarea,
  StPagination,
  StPopper,
  StSelect,
  StScrollbar,
  StSwitch,
  StTable,
  StTabs,
  StTabsCollapsed,
};

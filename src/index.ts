import { VueConstructor } from 'vue';

import StAutocomplete from './components/autocomplete/index.vue';
import StBadge from './components/badge/index.vue';
import StButtonGroup from './components/button-group/index.vue';
import StButton from './components/button/index.vue';
import StCheckbox from './components/checkbox/index.vue';
import StCircularCountdown from './components/circular-countdown/index.vue';
import StCol from './components/col/index.vue';
import StCollapser from './components/collapser/index.vue';
import StDatepicker from './components/datepicker/index.vue';
import StDialog from './components/dialog/index.vue';
import StDropdownOption from './components/dropdown-option/index.vue';
import StDropdown from './components/dropdown/index.vue';
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
import StTabs from './components/tabs/index.vue';
import StTextarea from './components/textarea/index.vue';
import StTooltip from './components/tooltip/index.vue';

const install = (Vue: VueConstructor) => {
  Vue.component('st-autocomplete', StAutocomplete);
  Vue.component('st-badge', StBadge);
  Vue.component('st-button', StButton);
  Vue.component('st-button-group', StButtonGroup);
  Vue.component('st-circular-countdown', StCircularCountdown);
  Vue.component('st-checkbox', StCheckbox);
  Vue.component('st-col', StCol);
  Vue.component('st-dialog', StDialog);
  Vue.component('st-dropdown', StDropdown);
  Vue.component('st-dropdown-option', StDropdownOption);
  Vue.component('st-collapser', StCollapser);
  Vue.component('st-datepicker', StDatepicker);
  Vue.component('st-icon', StIcon);
  Vue.component('st-input', StInput);
  Vue.component('st-notifications-group', StNotificationsGroup);
  Vue.component('st-row', StRow);
  Vue.component('st-textarea', StTextarea);
  Vue.component('st-radio', StRadio);
  Vue.component('st-pagination', StPagination);
  Vue.component('st-popper', StPopper);
  Vue.component('st-tooltip', StTooltip);
  Vue.component('st-select', StSelect);
  Vue.component('st-scrollbar', StScrollbar);
  Vue.component('st-switch', StSwitch);
  Vue.component('st-table', StTable);
  Vue.component('st-tabs', StTabs);

  /* eslint-disable-next-line no-param-reassign */
  Vue.prototype.$stNotification = StNotificationService;
};

export default {
  install,
  StAutocomplete,
  StBadge,
  StButton,
  StButtonGroup,
  StCheckbox,
  StCol,
  StCollapser,
  StDatepicker,
  StDialog,
  StDropdown,
  StDropdownOption,
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
};

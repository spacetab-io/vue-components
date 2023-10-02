import { App } from 'vue';

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

const install = (app: App) => {
  console.log(app);
  app.component('st-autocomplete', StAutocomplete);
  app.component('st-badge', StBadge);
  app.component('st-button', StButton);
  app.component('st-button-group', StButtonGroup);
  app.component('st-circular-countdown', StCircularCountdown);
  app.component('st-checkbox', StCheckbox);
  app.component('st-col', StCol);
  app.component('st-dialog', StDialog);
  app.component('st-dropdown', StDropdown);
  app.component('st-dropdown-option', StDropdownOption);
  app.component('st-collapser', StCollapser);
  app.component('st-datepicker', StDatepicker);
  app.component('st-icon', StIcon);
  app.component('st-input', StInput);
  app.component('st-notifications-group', StNotificationsGroup);
  app.component('st-row', StRow);
  app.component('st-textarea', StTextarea);
  app.component('st-radio', StRadio);
  app.component('st-pagination', StPagination);
  app.component('st-popper', StPopper);
  app.component('st-tooltip', StTooltip);
  app.component('st-select', StSelect);
  app.component('st-scrollbar', StScrollbar);
  app.component('st-switch', StSwitch);
  app.component('st-table', StTable);
  app.component('st-tabs', StTabs);

  /* eslint-disable-next-line no-param-reassign */
  // app.config.globalProperties.$stNotification = StNotificationService;
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

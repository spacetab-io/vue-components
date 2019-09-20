import Vue from 'vue';

import StBadge from './badge/index.vue';
import StButtonGroup from './button-group/index.vue';
import StButton from './button/index.vue';
import StCheckbox from './checkbox/index.vue';
import StCol from './col/index.vue';
import StCollapser from './collapser/index.vue';
import StIcon from './icon/index.vue';
import StInput from './input/index.vue';
import StNotification from './notification/index.vue';
import StNotificationsGroup from './notifications-group/index.vue';
import StPagination from './pagination/index.vue';
import StPopper from './popper/index.vue';
import StRadio from './radio/index.vue';
import StRow from './row/index.vue';
import StScrollbar from './scrollbar/index.vue';
import StSwitch from './switch/index.vue';
import StTabs from './tabs/index.vue';
import StTextarea from './textarea/index.vue';

const Components = {
  StBadge,
  StButton,
  StButtonGroup,
  StCheckbox,
  StCol,
  StCollapser,
  StIcon,
  StInput,
  StNotification,
  StNotificationsGroup,
  StPagination,
  StPopper,
  StRadio,
  StRow,
  StScrollbar,
  StSwitch,
  StTabs,
  StTextarea,
};

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name]);
});

export default Components;

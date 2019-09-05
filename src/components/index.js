import Vue from 'vue';

import StButton from './button/index.vue';
import StButtonGroup from './button-group/index.vue';
import StCheckbox from './checkbox/index.vue';
import StCol from './col/index.vue';
import StHello from './hello/index.vue';
import Icon from './icon/index.vue';
import StInput from './input/index.vue';
import StNotification from './notification/index.vue';
import StNotificationsGroup from './notifications-group/index.vue';
import StPopover from './popover/index.vue';
import StRadio from './radio/index.vue';
import StRow from './row/index.vue';
import StScrollbar from './scrollbar/index.vue';
import StSwitch from './switch/index.vue';
import StTextarea from './textarea/index.vue';

const Components = {
  StButton,
  StButtonGroup,
  StCheckbox,
  StCol,
  StHello,
  Icon,
  StInput,
  StNotification,
  StNotificationsGroup,
  StPopover,
  StRadio,
  StRow,
  StScrollbar,
  StSwitch,
  StTextarea,
};

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name]);
});

export default Components;

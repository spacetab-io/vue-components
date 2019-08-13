import Vue from 'vue';

import StButtonGroup from './button-group/index.vue';
import StButton from './button/index.vue';
import StCheckbox from './checkbox/index.vue';
import StCol from './col/index.vue';
import StIcon from './icon/index.vue';
import StInput from './input/index.vue';
import StRow from './row/index.vue';
import StTextarea from './textarea/index.vue';

const Components = {
  StButtonGroup,
  StButton,
  StCheckbox,
  StCol,
  StIcon,
  StInput,
  StRow,
  StTextarea,
};

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name]);
});

export default Components;

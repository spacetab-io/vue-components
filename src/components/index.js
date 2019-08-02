import Vue from 'vue';

import StButton from './button/index.vue';
import StCheckbox from './checkbox/index.vue';
import StCol from './col/index.vue';
import StIcon from './icon/index.vue';
import StInput from './input/index.vue';
import StRow from './row/index.vue';
import StTextarea from './textarea/index.vue';

const Components = {
  StButton,
  StIcon,
  StInput,
  StTextarea,
  StRow,
  StCol,
  StCheckbox,
};

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name]);
});

export default Components;

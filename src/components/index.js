import Vue from 'vue';

import StButton from './button/index.vue';
import StCol from './col/index.vue';
import StRow from './row/index.vue';

const Components = {
  StButton,
  StRow,
  StCol,
};

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name]);
});

export default Components;

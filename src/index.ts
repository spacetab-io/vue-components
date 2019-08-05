import { VueConstructor } from 'vue';

import StCheckbox from '@/components/checkbox/script';

import StButtonGroup from './components/button-group/index.vue';
import StButton from './components/button/index.vue';
import StCol from './components/col/index.vue';
import StIcon from './components/icon/index.vue';
import StRow from './components/row/index.vue';

const install = (Vue: VueConstructor) => {
  Vue.component('st-button', StButton);
  Vue.component('st-button-group', StButtonGroup);
  Vue.component('st-icon', StIcon);
  Vue.component('st-checkbox', StCheckbox);
  Vue.component('st-row', StRow);
  Vue.component('st-col', StCol);
};

export default {
  install,
  StButton,
  StButtonGroup,
  StIcon,
  StRow,
  StCol,
};

import { VueConstructor } from 'vue';

import StButtonGroup from './components/button-group/index.vue';
import StButton from './components/button/index.vue';
import StCheckbox from './components/checkbox/index.vue';
import StCol from './components/col/index.vue';
import StIcon from './components/icon/index.vue';
import StInput from './components/input/index.vue';
import StRow from './components/row/index.vue';
import StTextarea from './components/textarea/index.vue';

const install = (Vue: VueConstructor) => {
  Vue.component('st-button', StButton);
  Vue.component('st-button-group', StButtonGroup);
  Vue.component('st-checkbox', StCheckbox);
  Vue.component('st-col', StCol);
  Vue.component('st-icon', StIcon);
  Vue.component('st-input', StInput);
  Vue.component('st-row', StRow);
  Vue.component('st-textarea', StTextarea);
};

export default {
  install,
  StButton,
  StButtonGroup,
  StIcon,
  StInput,
  StRow,
  StCol,
};

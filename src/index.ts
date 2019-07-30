import { VueConstructor } from 'vue';

import StButtonGroup from './components/button-group/index.vue';
import StButton from './components/button/index.vue';
import StCol from './components/col/index.vue';
import StIcon from './components/icon/index.vue';
import StRow from './components/row/index.vue';

const install = (Vue: VueConstructor) => {
  Vue.component('st-button', StButton);
  Vue.component('st-button-group', StButtonGroup);
  Vue.component('st-icon', StIcon);
  Vue.component('st-row', StRow);
  Vue.component('st-col', StCol);

  Vue.prototype.$ELEMENT = {
    size: '',
  };
};

export default {
  install,
  StButton,
  StButtonGroup,
  StIcon,
  StRow,
  StCol,
}

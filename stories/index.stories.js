/* eslint-disable import/no-extraneous-dependencies */
import './assets/scss/index.scss';

import Vue from 'vue';

import StButton from '../src/components/button/index.vue';
import StButtonGroup from '../src/components/button-group/index.vue';
import StCheckbox from '../src/components/checkbox/index.vue';
import StCol from '../src/components/col/index.vue';
import Icon from '../src/components/icon/index.vue';
import StInput from '../src/components/input/index.vue';
import StRadio from '../src/components/radio/index.vue';
import StRow from '../src/components/row/index.vue';
import StScrollbar from '../src/components/scrollbar/index.vue';
import StSwitch from '../src/components/switch/index.vue';
import StTextarea from '../src/components/textarea/index.vue';

Vue.component('st-button', StButton);
Vue.component('st-button-group', StButtonGroup);
Vue.component('st-checkbox', StCheckbox);
Vue.component('st-col', StCol);
Vue.component('st-icon', Icon);
Vue.component('st-input', StInput);
Vue.component('st-radio', StRadio);
Vue.component('st-row', StRow);
Vue.component('st-scrollbar', StScrollbar);
Vue.component('st-switch', StSwitch);
Vue.component('st-textarea', StTextarea);

/* eslint-disable import/no-extraneous-dependencies */
import './assets/scss/index.scss';

import Vue from 'vue';

import StButton from '../src/components/button/index.vue';
import StButtonGroup from '../src/components/button-group/index.vue';
import StCheckbox from '../src/components/checkbox/index.vue';
import StIcon from '../src/components/icon/index.vue';
import StInput from '../src/components/input/index.vue';
import StTextarea from '../src/components/textarea/index.vue';
import StRow from '../src/components/row/index.vue';
import StCol from '../src/components/col/index.vue';
import StRadio from "../src/components/radio/index.vue";
import StSwitch from "../src/components/switch/index.vue";

Vue.component('st-button-group', StButtonGroup);
Vue.component('st-button', StButton);
Vue.component('st-switch', StSwitch);
Vue.component('st-input', StInput);
Vue.component('st-checkbox', StCheckbox);
Vue.component('st-radio', StRadio);
Vue.component('st-icon', StIcon);
Vue.component('st-textarea', StTextarea);
Vue.component('st-row', StRow);
Vue.component('st-col', StCol);

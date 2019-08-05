/* eslint-disable import/no-extraneous-dependencies */
import './assets/scss/index.scss';

import Vue from 'vue';

import StButton from '../src/components/button/index.vue';
import StButtonGroup from '../src/components/button-group/index.vue';
import StIcon from '../src/components/icon/index.vue';
import StRow from '../src/components/row/index.vue';
import StCol from '../src/components/col/index.vue';

Vue.component('st-button-group', StButtonGroup);
Vue.component('st-button', StButton);
Vue.component('st-icon', StIcon);
Vue.component('st-row', StRow);
Vue.component('st-col', StCol);

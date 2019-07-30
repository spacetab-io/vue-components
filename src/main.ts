import Vue from 'vue';
import App from './App.vue';
import StButton from './components/button/index.vue';
import StCol from './components/col/index.vue';
import StIcon from './components/icon/index.vue';
import StRow from './components/row/index.vue';

declare module 'vue/types/vue' {
  interface Vue {
    $ELEMENT: {
      size: string,
    }
  }
}

Vue.component('st-button', StButton);
Vue.component('st-icon', StIcon);
Vue.component('st-row', StRow);
Vue.component('st-col', StCol);


Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

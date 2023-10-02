import { createApp } from "vue"
import App from './App.vue';
import SpacetabUI from './index';
// declare module 'vue/types/vue' {
//   interface Vue {
//     $ELEMENT?: {
//       size: string,
//     }
//   }
// }


const app = createApp(App);
app.use(SpacetabUI);
app.mount('#app');
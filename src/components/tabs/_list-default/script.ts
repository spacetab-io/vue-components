import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';

import StTab from '../_tab/index.vue';
import { Tab } from '../types';

@Component({
  name: 'StTabsListDefault',
  components: {
    StTab,
  },
})
export default class StTabsListDefault extends Vue {
  @Prop(Array)
  tabs!: Tab[];

  @Prop(String)
  selectedId!: string;
}

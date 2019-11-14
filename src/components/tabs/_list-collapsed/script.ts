import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';

import StTab from '../_tab/index.vue';
import { PopperBindProperties } from '../../popper/types';
import { Tab } from '../types';

@Component({
  name: 'StTabsListCollapsed',
  components: {
    StTab,
  },
})
export default class StTabsListCollapsed extends Vue {
  @Prop(Array)
  tabs!: Tab[];

  @Prop(String)
  selectedId!: string;

  @Prop({ type: Object, default: () => {} })
  popperProps!: PopperBindProperties;
}

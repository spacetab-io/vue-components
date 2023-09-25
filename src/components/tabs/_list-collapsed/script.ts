import {
  Component,
  Prop,
  toNative,
  Vue,
} from 'vue-facing-decorator';

import { PopperBindProperties } from '../../popper/types';
import { Tab } from '../types';

@Component({
  name: 'StTabsListCollapsed',
})
class StTabsListCollapsed extends Vue {
  @Prop({ type: Array })
  tabs!: Tab[];

  @Prop({ type: Object, default: () => {} })
  popperProps!: PopperBindProperties;

  @Prop({ type: String})
  hiddenListClass?: string;
}

export default toNative(StTabsListCollapsed);
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';

import { PopperBindProperties } from '../../popper/types';
import { Tab } from '../types';

@Component({
  name: 'StTabsListCollapsed',
})
export default class StTabsListCollapsed extends Vue {
  @Prop(Array)
  tabs!: Tab[];

  @Prop({ type: Object, default: () => {} })
  popperProps!: PopperBindProperties;
}

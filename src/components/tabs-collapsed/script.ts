import {
  Component,
  Prop,
} from 'vue-property-decorator';

import { PopperBindProperties } from '../popper/types';
import StTabItem from '../tabs/_tab/index.vue';
import StTabs from '../tabs/script';


@Component({
  name: 'StTabsCollapsed',
  components: {
    StTabItem,
  },
})
export default class StTabsCollapsed extends StTabs {
  @Prop({ type: Object, default: () => {} })
  popperProps!: PopperBindProperties;
}

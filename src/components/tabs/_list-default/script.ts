import {
  Component,
  Prop,
  toNative,
  Vue,
} from 'vue-facing-decorator';

import { Tab } from '../types';

@Component({
  name: 'StTabsListDefault',
})
class StTabsListDefault extends Vue {
  @Prop({ type: Array })
  tabs!: Tab[];
}

export default toNative(StTabsListDefault);
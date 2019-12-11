import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';

import { Tab } from '../types';

@Component({
  name: 'StTabsListDefault',
})
export default class StTabsListDefault extends Vue {
  @Prop(Array)
  tabs!: Tab[];
}

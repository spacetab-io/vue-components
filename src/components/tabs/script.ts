import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';

import { Tab } from '@/components/tabs/types';


@Component({
  name: 'StTabs',
})
export default class StTabs extends Vue {
  @Prop(Array)
  tabs!: Tab[];
}

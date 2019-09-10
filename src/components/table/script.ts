import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';

import { ConfigItem } from './typings';


@Component({
  name: 'StTable',
})
export default class StTable extends Vue {
  @Prop({ type: Array, required: true })
  config!: ConfigItem[];

  @Prop({ type: Array, required: true })
  data!: object[];
}

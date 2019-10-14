import {
  Component,
  Prop,
} from 'vue-property-decorator';

import StSelectMultiple from './_select-multiple/index.vue';
import StSelectSingle from './_select-single/index.vue';
import StSelectBase from './_select.base';


@Component({
  name: 'StSelect',
  components: {
    StSelectSingle,
    StSelectMultiple,
  },
})
export default class StSelect extends StSelectBase {
  @Prop()
  value!: (string | string[]);

  @Prop(Boolean)
  multiple!: boolean;

  get componentName(): string {
    return `st-select-${this.multiple ? 'multiple' : 'single'}`;
  }
}

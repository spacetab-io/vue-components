import {
  Component,
  Prop,
} from 'vue-property-decorator';

import StSelectContent from '../_select-content/index.vue';
import StSelectDropdown from '../_select-dropdown/index.vue';
import StSelectBase from '../_select.base';
import { SelectOption } from '../types';


@Component({
  name: 'StSelectSingle',
  components: {
    StSelectContent,
    StSelectDropdown,
  },
})
export default class StSelectSingle extends StSelectBase {
  @Prop(String)
  value!: string;

  get selectedOption(): SelectOption | undefined {
    return this.options.find((option: SelectOption) => option && option.value === this.value);
  }

  get selectedLabel(): string {
    return this.selectedOption ? this.selectedOption.label : '';
  }

  select(option: SelectOption) {
    this.$emit('input', option.value);
    this.$emit('select', option);
  }

  clear() {
    this.$emit('input', null);
    this.$emit('clear');
  }
}

import {
  Component,
  Prop,
} from 'vue-property-decorator';

import StSelectContent from '../_select-content/index.vue';
import StSelectDropdown from '../_select-dropdown/index.vue';
import StSelectBase from '../_select.base';
import StCollapser from '../../collapser/index.vue';
import { SelectOption } from '../types';


@Component({
  name: 'StSelectMultiple',
  components: {
    StSelectContent,
    StSelectDropdown,
    StCollapser,
  },
})
export default class StSelectMultiple extends StSelectBase {
  @Prop(Array)
  value!: string[];

  selectedOptions: SelectOption[] = [];

  get selectedValues(): string[] {
    return this.selectedOptions.map((option: SelectOption) => option.value);
  }

  get selectedLabels(): string[] {
    return this.selectedOptions.map((option: SelectOption) => option.label);
  }

  updateSelectedOptions(option: SelectOption) {
    const optionIndex = this.selectedValues.indexOf(option.value);
    if (optionIndex > -1) {
      this.selectedOptions.splice(optionIndex, 1);
    } else {
      this.selectedOptions.push(option);
    }
  }

  isOptionSelected(value: string) {
    return this.selectedValues.indexOf(value) > -1;
  }

  select(option: SelectOption) {
    this.updateSelectedOptions(option);
    this.$emit('input', this.selectedValues);
    this.$emit('select', option);
  }

  clear() {
    this.selectedOptions = [];
    this.$emit('input', []);
    this.$emit('clear');
  }
}

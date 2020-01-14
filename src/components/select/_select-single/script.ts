import {
  Component,
  Prop,
} from 'vue-property-decorator';

import StSelectContent from '../_select-content/index.vue';
import StSelectDropdown from '../_select-dropdown/index.vue';
import StSelectDropdownScript from '../_select-dropdown/script';
import StSelectBase from '../_select.base';
import StIcon from '../../icon/index.vue';
import { SelectOption } from '../types';


@Component({
  name: 'StSelectSingle',
  components: {
    StSelectContent,
    StSelectDropdown,
    StIcon,
  },
})
export default class StSelectSingle extends StSelectBase {
  @Prop(String)
  value!: string;

  dropdownVisible: boolean = false;

  get updatedOptions(): SelectOption[] {
    return this.options.map(option => ({
      ...option,
      selected: this.selectedOption && this.selectedOption.value === option.value,
    }));
  }


  get selectedOption(): SelectOption | undefined {
    return this.options.find((option: SelectOption) => option && option.value === this.value);
  }

  get selectedLabel(): string {
    return this.selectedOption ? this.selectedOption.label : '';
  }

  select(option: SelectOption): void {
    this.$emit('input', option.value);
    this.$emit('select', option);
  }

  clear(): void {
    if (this.closeOnClear) {
      this.dropdownVisible = false;
    }
    this.$emit('input', null);
    this.$emit('clear');
  }

  openDropdown(): void {
    (this.$refs.dropdown as StSelectDropdownScript).openDropdown();
  }

  closeDropdown(): void {
    (this.$refs.dropdown as StSelectDropdownScript).closeDropdown();
  }
}

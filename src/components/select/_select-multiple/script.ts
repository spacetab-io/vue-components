import merge from 'lodash/merge';
import {
  Component,
  Prop,
  Watch,
} from 'vue-property-decorator';

import StSelectContent from '../_select-content/index.vue';
import StSelectDropdown from '../_select-dropdown/index.vue';
import StSelectDropdownScript from '../_select-dropdown/script';
import StSelectBase from '../_select.base';
import StCheckbox from '../../checkbox/index.vue';
import StCollapser from '../../collapser/index.vue';
import {
  PopperBindProperties,
  PopperPlacement,
  TriggerType,
} from '../../popper/types';
import {
  MultipleSelectValue,
  SelectOption,
} from '../types';


@Component({
  name: 'StSelectMultiple',
  components: {
    StSelectContent,
    StSelectDropdown,
    StCollapser,
    StCheckbox,
  },
})
export default class StSelectMultiple extends StSelectBase {
  @Prop(Array)
  value!: MultipleSelectValue;

  // Extends with onValueChange method from _select.base
  onValueChange(): void {
    this.updateSelectedOptions();
  }

  dropdownVisible: boolean = false;

  selectedOptions: SelectOption[] = [];

  extendedCollapserPopperProps: PopperBindProperties = {
    arrowVisible: true,
    placement: PopperPlacement.top,
    trigger: TriggerType.hover,
    boundariesSelector: 'body',
    stopPropagation: true,
  };

  get updatedOptions(): SelectOption[] {
    return this.options.map(option => ({
      ...option,
      selected: this.selectedValues && this.selectedValues.includes(option.value),
    }));
  }

  get selectedValues(): string[] {
    return this.selectedOptions.map((option: SelectOption) => option.value);
  }

  get selectedLabels(): string[] {
    return this.selectedOptions.map((option: SelectOption) => option.label);
  }

  get collapserPopperClass(): string {
    return [
      'st-select-multiple__collapser-dropdown',
      this.extendedCollapserPopperProps.popperClass,
    ].filter(Boolean).join(' ');
  }

  @Watch('collapserPopperProps')
  onCollapserPopperPropsChange(): void {
    this.mergeCollapserPopperProps();
  }

  beforeMount(): void {
    this.mergeCollapserPopperProps();
  }

  mergeCollapserPopperProps(): void {
    merge(this.extendedCollapserPopperProps, this.collapserPopperProps);
  }

  updateSelectedOptions(): void {
    this.selectedOptions = this.options.reduce((acc: SelectOption[], option: SelectOption) => {
      if (this.value.includes(option.value)) {
        acc.push(option);
      }
      return acc;
    }, []);
  }

  processSelectedOption(option: SelectOption): void {
    const optionIndex = this.selectedValues.indexOf(option.value);
    if (optionIndex > -1) {
      this.selectedOptions.splice(optionIndex, 1);
    } else {
      this.selectedOptions.push(option);
    }
  }

  isOptionSelected(value: string): boolean {
    return this.selectedValues.indexOf(value) > -1;
  }

  select(option: SelectOption): void {
    this.processSelectedOption(option);
    this.$emit('input', this.selectedValues);
    this.$emit('select', option);
  }

  clear(): void {
    if (this.closeOnClear) {
      this.dropdownVisible = false;
    }
    this.selectedOptions = [];
    this.$emit('input', []);
    this.$emit('clear');
  }

  openDropdown(): void {
    (this.$refs.dropdown as StSelectDropdownScript).openDropdown();
  }

  closeDropdown(): void {
    (this.$refs.dropdown as StSelectDropdownScript).closeDropdown();
  }
}

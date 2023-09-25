import {
  Component,
  Prop,
  toNative,
} from 'vue-facing-decorator';

import StSelectContent from '../_select-content/index.vue';
import StSelectDropdown from '../_select-dropdown/index.vue';
import StSelectDropdownScript from '../_select-dropdown/script';
import StSelectBase from '../_select.base';
import {
  ComponentValidator,
  ValidatableComponent,
} from '../../../utils/validation';
import StIcon from '../../icon/index.vue';
import {
  SelectOption,
  SingleSelectValue,
} from '../types';


@Component({
  name: 'StSelectSingle',
  components: {
    StSelectContent,
    StSelectDropdown,
    StIcon,
  },
})
class StSelectSingle extends StSelectBase implements ValidatableComponent<SingleSelectValue> {
  @Prop({ type: String})
  value!: SingleSelectValue;

  @Prop({ type: ComponentValidator })
  validator?: ComponentValidator<SingleSelectValue>;

  dropdownVisible: boolean = false;

  isValid: boolean = true;

  // Extends with onValueChange method from _select.base
  onValueChange(): void {
    if (this.validator) {
      this.validator.validate();
    }
  }

  onValidatorChanged(newValidator: ComponentValidator<SingleSelectValue>): void {
    if (newValidator) {
      newValidator.setComponent(this);
      newValidator.onAfterValidation((newValue: boolean) => {
        this.isValid = newValue;
      });
    }
  }

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
    this.$emit('input', '');
    this.$emit('clear');
  }

  openDropdown(): void {
    (this.$refs.dropdown as StSelectDropdownScript).openDropdown();
  }

  closeDropdown(): void {
    (this.$refs.dropdown as StSelectDropdownScript).closeDropdown();
  }

  validateValue(): SingleSelectValue {
    return this.value;
  }
}

export default toNative(StSelectSingle);
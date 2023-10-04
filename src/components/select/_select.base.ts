import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-facing-decorator';

import { ComponentValidator } from '../../utils/validation';
import { DropdownBindProperties } from '../dropdown/types';
import {
  BaseSelectValue,
  SelectOption,
} from './types';

@Component({})
export default class StSelectBase extends Vue {
  @Prop()
  value!: BaseSelectValue;

  @Prop({ type: ComponentValidator })
  validator?: ComponentValidator<BaseSelectValue>;

  @Prop({ type: Boolean})
  multiple!: boolean;

  @Prop({ type: Array })
  options!: SelectOption[];

  @Prop({ type: String})
  optionClass?: string;

  @Prop({ type: String})
  placeholder!: string;

  @Prop({ type: Boolean})
  disabled!: boolean;

  @Prop({ type: Boolean})
  readonly!: boolean;

  @Prop({ type: Boolean})
  required!: boolean;

  @Prop({ type: Boolean})
  clearable!: boolean;

  @Prop({ type: Boolean})
  loading!: boolean;

  @Prop({ type: String})
  size!: string;

  @Prop({ type: String})
  prefixIcon!: string;

  @Prop({ type: String})
  suffixIcon!: string;

  @Prop({ type: Boolean, default: true })
  showArrowIcon!: boolean;

  @Prop({ type: Boolean, default: true })
  clearIconAsArrowIcon!: boolean;

  @Prop({ type: Boolean, default: true })
  closeOnClear!: boolean;

  @Prop({ type: Boolean, default: true })
  closeOnSelect!: boolean;

  @Prop({ type: Object, default: () => {} })
  dropdownProps!: DropdownBindProperties;

  @Prop({ type: Object, default: () => {} })
  collapserPopperProps!: DropdownBindProperties;

  isValid: boolean = true;

  // Watch on `value` doesn't work in extended classes without this
  @Watch('value')
  onValueChange(): void {}

  @Watch('validator', { immediate: true })
  onValidatorChanged(newValidator: ComponentValidator<BaseSelectValue>): void {
    if (newValidator) {
      newValidator.setComponent(this);
      newValidator.onAfterValidation((newValue: boolean) => {
        this.isValid = newValue;
      });
    }
  }

  validateValue(): BaseSelectValue {
    return this.value;
  }
}

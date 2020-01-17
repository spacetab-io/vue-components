import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';

import {
  ComponentValidator,
  ValidatableComponent,
} from '../../utils/validation';


@Component({
  name: 'StInput',
})
export default class StInput extends Vue implements ValidatableComponent<string> {
  // Wrapper props
  @Prop(String)
  size!: string;

  @Prop({ type: Boolean, default: true })
  clearable!: boolean;

  @Prop(String)
  prefixIcon!: string;

  @Prop(String)
  suffixIcon!: string;

  @Prop(Boolean)
  loading!: boolean;

  @Prop(Boolean)
  focusState!: boolean;

  // Input props
  @Prop({ type: String, default: '' })
  value!: string;

  @Prop(String)
  type!: string;

  @Prop(Boolean)
  required!: boolean;

  @Prop(Boolean)
  disabled!: boolean;

  @Prop(Boolean)
  readonly!: boolean;

  @Prop(String)
  placeholder!: string;

  @Prop(Number)
  maxlength!: number;

  @Prop(String)
  name!: string;

  @Prop(String)
  pattern!: string;

  // Other props
  @Prop(Boolean)
  focusAfterClear!: boolean;

  @Prop(Boolean)
  clearIconAsSuffixIcon!: boolean;

  @Prop(Number)
  tabindex!: number;

  @Prop(Boolean)
  preventInput?: boolean;

  @Prop(ComponentValidator)
  validator?: ComponentValidator<string>;

  inputValue = this.value;

  inputHovered = false;

  inputFocused = false;

  isValid: boolean = true;

  validateValue(): string {
    return this.value;
  }

  get showClearIcon(): boolean {
    return this.clearable && !!this.inputValue;
  }

  get showSuffixIcon(): boolean {
    if (!this.clearIconAsSuffixIcon) {
      return !!this.suffixIcon;
    }

    return !!this.suffixIcon && !this.showClearIcon;
  }

  @Watch('value')
  onValueChange(value: string) {
    if (this.validator) {
      this.validator.validate();
    }

    this.setInputValue(value);
  }

  @Watch('validator', { immediate: true })
  onValidatorChanged(newValidator?: ComponentValidator<string>): void {
    if (newValidator) {
      newValidator.setComponent(this);
      newValidator.onAfterValidation((newValue: boolean): void => {
        this.isValid = newValue;
      });
    }
  }

  @Watch('focusState')
  onFocusStateChange(value: boolean) {
    this.inputFocused = value;
  }

  setInputValue(value: string) {
    if (value !== this.inputValue) {
      this.inputValue = value;
    }
  }

  onWrapperMouseEvent(isHovered: boolean) {
    if (this.disabled) { return; }
    this.inputHovered = isHovered;
  }

  handleInput(event: Event) {
    const { value } = event.target as HTMLInputElement;
    this.$emit('input', value);
    if (!this.preventInput) {
      this.setInputValue(value);
    }
  }

  handleChange(event: Event) {
    this.$emit('change', (event.target as HTMLInputElement).value);
  }

  handleFocus(event: Event) {
    this.inputFocused = true;
    this.$emit('focus', event);
  }

  handleBlur(event: Event) {
    if (!this.focusState) {
      this.inputFocused = false;
    }
    this.$emit('blur', event);
  }

  handleKeydown(event: KeyboardEvent) {
    this.$emit('keydown', event);
  }

  handleKeyup(event: KeyboardEvent) {
    this.$emit('keyup', event);
  }

  handleKeypress(event: KeyboardEvent) {
    this.$emit('keypress', event);
  }

  handleClear() {
    this.$emit('input', '');
    this.$emit('change', '');
    this.setInputValue('');
    if (this.focusAfterClear) {
      this.focusInput();
    }
    this.$emit('clear');
  }

  focusInput() {
    (this.$refs.input as HTMLInputElement).focus();
  }

  blurInput() {
    (this.$refs.input as HTMLInputElement).blur();
  }
}

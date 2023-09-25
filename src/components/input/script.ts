import {
  Component,
  Prop,
  toNative,
  Vue,
  Watch,
} from 'vue-facing-decorator';

import {
  ComponentValidator,
  ValidatableComponent,
} from '../../utils/validation';


@Component({
  name: 'StInput',
})
class StInput extends Vue implements ValidatableComponent<string> {
  // Wrapper props
  @Prop({ type: String})
  size!: string;

  @Prop({ type: Boolean, default: true })
  clearable!: boolean;

  @Prop({ type: String})
  prefixIcon!: string;

  @Prop({ type: String})
  suffixIcon!: string;

  @Prop({ type: Boolean})
  loading!: boolean;

  @Prop({ type: Boolean})
  focusState!: boolean;

  // Input props
  @Prop({ type: String, default: '' })
  value!: string;

  @Prop({ type: String})
  innerId!: string;

  @Prop({ type: String})
  type!: string;

  @Prop({ type: Boolean})
  required!: boolean;

  @Prop({ type: Boolean})
  disabled!: boolean;

  @Prop({ type: Boolean})
  readonly!: boolean;

  @Prop({ type: String})
  placeholder!: string;

  @Prop({ type: Number})
  maxlength!: number;

  @Prop({ type: String})
  name!: string;

  @Prop({ type: String})
  pattern!: string;

  // Other props
  @Prop({ type: Boolean})
  focusAfterClear!: boolean;

  @Prop({ type: Boolean})
  clearIconAsSuffixIcon!: boolean;

  @Prop({ type: Number})
  tabindex!: number;

  @Prop({ type: Boolean})
  preventInput?: boolean;

  @Prop({ type: ComponentValidator })
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
      this.focus();
    }
    this.$emit('clear');
  }

  focus() {
    (this.$refs.input as HTMLInputElement).focus();
  }

  blur() {
    (this.$refs.input as HTMLInputElement).blur();
  }
}

export default toNative(StInput);

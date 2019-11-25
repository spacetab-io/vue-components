import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';


@Component({
  name: 'StInput',
})
export default class StInput extends Vue {
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
  @Prop({ type: Boolean, default: true })
  focusAfterClear!: boolean;

  @Prop(Boolean)
  clearIconAsSuffixIcon!: boolean;

  @Prop(Number)
  tabindex!: number;

  inputValue = this.value;

  inputHovered = false;

  inputFocused = false;

  get showCloseIcon() {
    return this.clearable && !!this.inputValue;
  }

  @Watch('value')
  onValueChange(value: string) {
    this.setInputValue(value);
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
    this.setInputValue(value);
  }

  handleChange(event: Event) {
    this.$emit('change', (event.target as HTMLInputElement).value);
  }

  handleFocus(event: Event) {
    this.inputFocused = true;
    this.$emit('focus', event);
  }

  handleBlur(event: Event) {
    this.inputFocused = false;
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

  clearInput() {
    this.$emit('input', '');
    this.$emit('change', '');
    this.setInputValue('');
    if (this.focusAfterClear) {
      this.focusInput();
    }
    this.$emit('clear', '');
  }

  focusInput() {
    (this.$refs.input as HTMLInputElement).focus();
  }
}

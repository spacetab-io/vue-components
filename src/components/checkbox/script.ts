import {
  Component,
  Emit,
  Prop,
  toNative,
  Vue,
} from 'vue-facing-decorator';

@Component
class StCheckbox extends Vue {
  @Prop({ type: Boolean })
  readonly disabled?: boolean;

  @Prop({ type: Boolean })
  readonly readonly?: boolean;

  @Prop({ type: Boolean })
  readonly value?: boolean;

  @Prop({ type: Boolean })
  readonly indeterminate?: boolean;

  @Prop({ type: String })
  readonly id?: string;

  @Prop({ type: [String, Number] })
  readonly label?: string | number;

  hovered: boolean = false;

  focused: boolean = false;

  @Emit('input')
  emmitInput(newValue: boolean) {
    return newValue;
  }

  toggleCheckbox() {
    if (this.disabled || this.readonly) {
      return;
    }

    this.emmitInput(!this.value);
  }

  get checkboxMods() {
    return {
      'st-checkbox--checked': this.value,
      'st-checkbox--indeterminate': this.indeterminate,
      'st-checkbox--disabled': this.disabled,
      'st-checkbox--readonly': this.readonly,
      'st-checkbox--hovered': this.hovered,
      'st-checkbox--focused': this.focused,
    };
  }
}

export default toNative(StCheckbox);
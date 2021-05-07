import {
  Component,
  Emit,
  Prop,
  Vue,
} from 'vue-property-decorator';

@Component
export default class StCheckbox extends Vue {
  @Prop(Boolean)
  readonly disabled?: boolean;

  @Prop(Boolean)
  readonly readonly?: boolean;

  @Prop(Boolean)
  readonly value?: boolean;

  @Prop(Boolean)
  readonly indeterminate?: boolean;

  @Prop(String)
  readonly id?: string;

  @Prop([String, Number])
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

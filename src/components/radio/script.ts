import {
  Component,
  Emit,
  Prop,
  toNative,
  Vue,
} from 'vue-facing-decorator';

@Component
class StRadio extends Vue {
  @Prop({ required: true })
  value!: any;

  @Prop({ required: true })
  option!: any;

  @Prop({ type: String, required: true })
  readonly name!: string;

  @Prop({ type: String})
  label?: string;

  @Prop({ type: Boolean})
  disabled!: boolean;

  @Prop({ type: String})
  readonly id?: string;

  @Prop({ type: Boolean})
  readonly readonly?: boolean;

  focused: boolean = false;

  hovered: boolean = false;

  @Emit('input')
  public emitInput() {
    return this.option;
  }

  public toggleRadio() {
    if (this.disabled || this.readonly) {
      return;
    }

    this.emitInput();
  }

  get isSelected(): boolean {
    return this.value === this.option;
  }

  get rootClasses(): { [key: string]: boolean } {
    return {
      'st-radio--selected': this.isSelected,
      'st-radio--disabled': this.disabled,
      'st-radio--readonly': !!this.readonly,
      'st-radio--focused': this.focused,
      'st-radio--hovered': this.hovered,
    };
  }
}

export default toNative(StRadio);
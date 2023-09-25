import {
  Component,
  Emit,
  Prop,
  toNative,
  Vue,
} from 'vue-facing-decorator';

@Component
class StSwitch extends Vue {
  @Prop({ type: Boolean})
  value!: boolean;

  @Prop({ type: Boolean})
  disabled!: boolean;

  @Prop({ type: String})
  activeLabel?: string;

  @Prop({ type: String})
  inactiveLabel?: string;

  @Emit('input')
  emitInput(newValue: boolean): boolean {
    return newValue;
  }

  toggleValue() {
    if (this.disabled) {
      return;
    }

    this.emitInput(!this.value);
  }

  inactiveClicked() {
    if (this.disabled) {
      return;
    }

    this.emitInput(false);
  }

  activeClicked() {
    if (this.disabled) {
      return;
    }

    this.emitInput(true);
  }

  get rootClasses() {
    return {
      'st-switch--disabled': this.disabled,
      'st-switch--active': this.isActive,
    };
  }

  get isActive() {
    return this.value;
  }
}

export default toNative(StSwitch);
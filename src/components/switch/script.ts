import {
  Component,
  Emit,
  Prop,
  Vue,
} from 'vue-property-decorator';

@Component
export default class StSwitch extends Vue {
  @Prop(Boolean)
  value!: boolean;

  @Prop(Boolean)
  disabled!: boolean;

  @Prop(String)
  activeLabel?: string;

  @Prop(String)
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

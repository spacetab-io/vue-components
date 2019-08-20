import {
  Component,
  Emit,
  Prop,
  Vue,
} from 'vue-property-decorator';

@Component
export default class StCheckbox extends Vue {
    @Prop(Boolean)
  readonly disabled!: boolean;

    @Prop(String)
    readonly value!: boolean;

    @Prop(String)
    readonly label!: string;

    @Emit('input')
    emmitInput(newValue: boolean) {
      return newValue;
    }

    toggleCheckbox() {
      if (this.disabled) {
        return;
      }

      this.emmitInput(!this.value);
    }

    get checkboxMods() {
      return {
        'st-checkbox--checked': this.value,
        'st-checkbox--disabled': this.disabled,
      };
    }
}

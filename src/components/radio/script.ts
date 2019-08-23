import {
  Component, Emit, Prop, Vue,
} from 'vue-property-decorator';

@Component
export default class StRadio extends Vue {
  @Prop({ required: true })
  value!: any;

  @Prop({ required: true })
  option!: any;

  @Prop(String)
  label?: string;

  @Prop(Boolean)
  disabled!: boolean;

  @Emit('input')
  public select() {
    return this.option;
  }

  public onClick() {
    if (this.disabled) {
      return;
    }

    this.select();
  }

  get isSelected(): boolean {
    return this.value === this.option;
  }

  get rootClasses(): { [key: string]: boolean } {
    return {
      'st-radio--selected': this.isSelected,
      'st-radio--disabled': this.disabled,
    };
  }
}

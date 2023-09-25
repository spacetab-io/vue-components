import {
  Component,
  Prop,
  toNative,
  Vue,
  Watch,
} from 'vue-facing-decorator';


@Component({
  name: 'StTextarea',
})
class StTextarea extends Vue {
  // Wrapper props
  @Prop({ type: String})
  size!: string;

  @Prop({ type: Boolean, default: true })
  resizable!: boolean;

  // Textarea values
  @Prop({ type: String, default: '' })
  value!: string;

  @Prop({ type: Boolean})
  disabled!: boolean;

  @Prop({ type: Boolean})
  loading!: boolean;

  @Prop({ type: Boolean})
  readonly!: boolean;

  @Prop({ type: Boolean})
  required!: boolean;

  @Prop({ type: String})
  placeholder!: string;

  @Prop({ type: Number})
  minlength!: number;

  @Prop({ type: Number})
  maxlength!: number;

  @Prop({ type: Boolean})
  autofocus!: boolean;

  @Prop({ type: Number})
  rows!: number;

  @Prop({ type: Number})
  cols!: number;

  @Prop({ type: String})
  name!: string;

  @Prop({ type: Number})
  tabindex!: number;

  textareaValue: string = this.value;

  setTextareaValue(value: string) {
    if (value !== this.textareaValue) {
      this.textareaValue = value;
    }
  }

  handleInput(event: Event) {
    const { value } = event.target as HTMLTextAreaElement;
    this.$emit('input', value);
    this.setTextareaValue(value);
  }

  handleChange(event: Event) {
    this.$emit('change', (event.target as HTMLTextAreaElement).value);
  }

  @Watch('value')
  onValueChange(value: string) {
    this.setTextareaValue(value);
  }
}

export default toNative(StTextarea);
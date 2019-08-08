import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';


@Component({
  name: 'StTextarea',
})
export default class StTextarea extends Vue {
  // Wrapper props
  @Prop(String)
  size!: string;

  @Prop({ type: Boolean, default: true })
  resizable!: boolean;

  // Textarea values
  @Prop({ type: String, default: '' })
  value!: string;

  @Prop(Boolean)
  disabled!: boolean;

  @Prop(Boolean)
  loading!: boolean;

  @Prop(Boolean)
  readonly!: boolean;

  @Prop(Boolean)
  required!: boolean;

  @Prop(String)
  placeholder!: string;

  @Prop(Number)
  minlength!: number;

  @Prop(Number)
  maxlength!: number;

  @Prop(Boolean)
  autofocus!: boolean;

  @Prop(Number)
  rows!: number;

  @Prop(Number)
  cols!: number;

  @Prop(String)
  name!: string;

  @Prop(Number)
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

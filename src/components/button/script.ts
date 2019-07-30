import {
  Component,
  Inject,
  Prop,
  Vue,
} from 'vue-property-decorator';
import StIcon from '../icon/index.vue';

@Component({
  components: {
    StIcon,
  },
})
export default class StButton extends Vue {
  @Inject({ default: '' }) elFormItem!: any;

  @Prop({ type: String, default: 'default' })
  type!: string;

  @Prop(String)
  size!: string;

  @Prop({ type: String, default: '' })
  icon!: string;

  @Prop({ type: String, default: 'button' })
  nativeType!: string;

  @Prop(Boolean)
  loading!: string;

  @Prop(Boolean)
  disabled!: string;

  @Prop(Boolean)
  plain!: string;

  @Prop(Boolean)
  autofocus!: string;

  @Prop(Boolean)
  round!: string;

  @Prop(Boolean)
  circle!: string;

  @Prop(Boolean)
  approve!: string;

  @Prop(Boolean)
  cancel!: string;

  @Prop(Boolean)
  remove!: string;

  @Prop(Boolean)
  search!: string;

  @Prop(Boolean)
  boldBorder!: string;

  handleClick($event: any) {
    this.$emit('click', $event);
  }

  handleInnerClick($event: any) {
    if (this.disabled) {
      $event.stopPropagation();
    }
  }

  get buttonClass() {
    return [
      this.type ? 'st-button--' + this.type : '',
      this.buttonSize ? 'st-button--' + this.buttonSize : '',
      {
        'st-button--disabled': this.disabled,
        'st-button--loading': this.loading,
        'st-button--plain': this.plain,
        'st-button--round': this.round,
        'st-button--circle': this.circle,
        'st-button--approve': this.approve,
        'st-button--cancel': this.cancel,
        'st-button--remove': this.remove,
        'st-button--search': this.search,
        'st-button--icon': this.icon,
        'st-button--bold-border': this.boldBorder,
      },
    ];
  }


  get _elFormItemSize(): string {
    return (this.elFormItem || {}).elFormItemSize;
  }

  get buttonSize(): string {
    return this.size || this._elFormItemSize || (this.$ELEMENT || { size: undefined }).size;
  }
}

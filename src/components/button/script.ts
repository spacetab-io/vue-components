import {
  Component,
  Inject,
  Prop,
  toNative,
  Vue,
} from 'vue-facing-decorator';

import StIcon from '../icon/index.vue';


@Component({
  name: 'StButton',
  components: {
    StIcon,
  },
})
class StButton extends Vue {
  @Inject({ default: '' }) elFormItem!: any;

  @Prop({ type: String, default: 'default' })
  type!: string;

  @Prop({ type: String })
  size!: string;

  @Prop({ type: String, default: '' })
  icon!: string;

  @Prop({ type: String, default: 'button' })
  nativeType!: string;

  @Prop({ type: Boolean })
  loading!: string;

  @Prop({ type: Boolean })
  disabled!: string;

  @Prop({ type: Boolean })
  plain!: string;

  @Prop({ type: Boolean })
  autofocus!: string;

  @Prop({ type: Boolean })
  round!: string;

  @Prop({ type: Boolean })
  circle!: string;

  @Prop({ type: Boolean })
  approve!: string;

  @Prop({ type: Boolean })
  cancel!: string;

  @Prop({ type: Boolean })
  remove!: string;

  @Prop({ type: Boolean })
  search!: string;

  @Prop({ type: Boolean })
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
      this.type ? `st-button--${this.type}` : '',
      this.size ? `st-button--${this.size}` : '',
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


  get elFormItemSize(): string {
    return (this.elFormItem || {}).elFormItemSize;
  }

  get buttonSize(): string {
    return this.size || this.elFormItemSize;
  }
}

export default toNative(StButton);
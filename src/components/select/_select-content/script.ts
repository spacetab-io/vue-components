import {
  Component,
  Prop,
  toNative,
  Vue,
  Watch,
} from 'vue-facing-decorator';

import StIcon from '../../icon/index.vue';
import StInput from '../../input/index.vue';


@Component({
  name: 'StSelectContent',
  components: {
    StIcon,
    StInput,
  },
})
class StSelectContent extends Vue {
  @Prop({ type: String})
  value!: string;

  @Prop({ type: String})
  size!: string;

  @Prop({ type: String})
  prefixIcon!: string;

  @Prop({ type: String})
  suffixIcon!: string;

  @Prop({ type: Boolean, default: true })
  showArrowIcon!: boolean;

  @Prop({ type: Boolean, default: true })
  clearIconAsArrowIcon!: boolean;

  @Prop({ type: Boolean})
  multiple!: boolean;

  @Prop({ type: String})
  placeholder!: string;

  @Prop({ type: Boolean})
  loading!: boolean;

  @Prop({ type: Boolean})
  disabled!: boolean;

  @Prop({ type: Boolean})
  readonly!: boolean;

  @Prop({ type: Boolean})
  required!: boolean;

  @Prop({ type: Boolean})
  clearable!: boolean;

  @Prop({ type: Boolean})
  isActive!: boolean;

  isFocused: boolean = false;

  @Watch('isActive')
  onIsActiveChange(value: boolean): void {
    this.isFocused = value;
  }

  get isArrowIconVisible(): boolean {
    return this.clearIconAsArrowIcon && this.clearable ? !this.value : this.showArrowIcon;
  }
}

export default toNative(StSelectContent);
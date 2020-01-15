import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';

import StIcon from '../../icon/index.vue';


@Component({
  name: 'StSelectContent',
  components: {
    StIcon,
  },
})
export default class StSelectContent extends Vue {
  @Prop(String)
  value!: string;

  @Prop(String)
  size!: string;

  @Prop(String)
  prefixIcon!: string;

  @Prop(String)
  suffixIcon!: string;

  @Prop({ type: Boolean, default: true })
  showArrowIcon!: boolean;

  @Prop({ type: Boolean, default: true })
  clearIconAsArrowIcon!: boolean;

  @Prop(Boolean)
  multiple!: boolean;

  @Prop(String)
  placeholder!: string;

  @Prop(Boolean)
  loading!: boolean;

  @Prop(Boolean)
  disabled!: boolean;

  @Prop(Boolean)
  readonly!: boolean;

  @Prop(Boolean)
  required!: boolean;

  @Prop(Boolean)
  clearable!: boolean;

  @Prop(Boolean)
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

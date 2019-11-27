import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';

import StIcon from '../../icon/index.vue';


const DEFAULT_SUFFIX_ICON = 'arrow-down';

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
  prefixIcon!: string;

  @Prop({ type: String, default: DEFAULT_SUFFIX_ICON })
  suffixIcon!: string;

  @Prop({ type: Boolean, default: true })
  clearIconAsSuffixIcon!: boolean;

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

  isFocused = false;

  @Watch('isActive')
  onIsActiveChange(value: boolean) {
    this.isFocused = value;
  }

  get suffixIconClassName(): string {
    const partName = this.suffixIcon === DEFAULT_SUFFIX_ICON ? 'arrow' : 'suffix';
    return `st-select-content__${partName}-icon`;
  }

  get isSuffixIconVisible(): boolean {
    return !this.clearIconAsSuffixIcon ? true : !this.value;
  }
}

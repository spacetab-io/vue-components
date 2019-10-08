import {
  Component,
  Prop,
  Vue,
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
  prefixIcon!: string;

  @Prop(String)
  suffixIcon!: string;

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

  @Prop(String)
  inputClass!: string;

  isHovered = false;

  isFocused = false;

  get showClear(): boolean {
    return this.clearable && !this.disabled && !this.readonly && !!this.value;
  }

  clear() {
    this.$emit('clear');
  }
}

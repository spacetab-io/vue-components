import merge from 'lodash/merge';
import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';

import StDropdownOption from '../../dropdown-option/index.vue';
import StDropdown from '../../dropdown/index.vue';
import StDropdownScript from '../../dropdown/script';
import {
  PopperBindProperties,
  PopperPlacement,
  TriggerType,
} from '../../popper/types';
import { SelectOption } from '../types';


@Component({
  name: 'StSelectDropdown',
  components: {
    StDropdown,
    StDropdownOption,
  },
})
export default class StSelectDropdown extends Vue {
  @Prop(Array)
  options!: SelectOption[];

  @Prop({ type: Array, default: () => [] })
  selectedValues!: string[];

  @Prop({ type: Boolean, default: true })
  closeOnSelect!: boolean;

  @Prop(String)
  popperClass!: string;

  @Prop(String)
  optionClass!: string;

  @Prop(Boolean)
  disabled!: boolean;

  @Prop(Boolean)
  readonly!: boolean;

  @Prop({ type: Object, default: () => {} })
  popperProps!: PopperBindProperties;

  extendedPopperProps: PopperBindProperties = {
    arrowVisible: false,
    placement: PopperPlacement.bottom,
    trigger: TriggerType.click,
    boundariesSelector: 'body',
    appendToBody: false,
  };

  @Watch('popperProps')
  onPopperPropsChange(): void {
    this.mergePopperProps();
  }

  beforeMount(): void {
    this.mergePopperProps();
  }

  mergePopperProps(): void {
    merge(this.extendedPopperProps, this.popperProps);
  }

  select(option: SelectOption): void {
    if (this.readonly || option.disabled) { return; }
    this.$emit('select', option);
    if (this.closeOnSelect) {
      this.closeDropdown();
    }
  }

  openDropdown(): void {
    (this.$refs.dropdown as StDropdownScript).open();
  }

  closeDropdown(): void {
    (this.$refs.dropdown as StDropdownScript).close();
  }
}

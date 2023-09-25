import merge from 'lodash/merge';
import {
  Component,
  Prop,
  toNative,
  Vue,
  Watch,
} from 'vue-facing-decorator';

import StDropdownOption from '../../dropdown-option/index.vue';
import StDropdown from '../../dropdown/index.vue';
import StDropdownScript from '../../dropdown/script';
import { DropdownBindProperties } from '../../dropdown/types';
import {
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
class StSelectDropdown extends Vue {
  @Prop({ type: Array })
  options!: SelectOption[];

  @Prop({ type: Array, default: () => [] })
  selectedValues!: string[];

  @Prop({ type: Boolean, default: true })
  closeOnSelect!: boolean;

  @Prop({ type: String})
  popperClass!: string;

  @Prop({ type: String})
  optionClass?: string;

  @Prop({ type: String})
  optionAdditionalClass!: string;

  @Prop({ type: Boolean})
  disabled!: boolean;

  @Prop({ type: Boolean})
  readonly!: boolean;

  @Prop({ type: Object, default: () => {} })
  dropdownProps!: DropdownBindProperties;

  extendedDropdownProps: DropdownBindProperties = {
    arrowVisible: false,
    placement: PopperPlacement.bottomStart,
    trigger: TriggerType.click,
    boundariesSelector: 'body',
  };

  @Watch('dropdownProps')
  onDropdownPropsChange(): void {
    this.mergeDropdownProps();
  }

  beforeMount(): void {
    this.mergeDropdownProps();
  }

  mergeDropdownProps(): void {
    merge(this.extendedDropdownProps, this.dropdownProps);
    this.extendedDropdownProps.popperClass = [
      'st-select-dropdown',
      this.extendedDropdownProps.popperClass,
    ].join(' ');
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

export default toNative(StSelectDropdown);
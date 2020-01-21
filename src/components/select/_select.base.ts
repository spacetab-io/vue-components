import {
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';

import { DropdownBindProperties } from '../dropdown/types';
import {
  BaseSelectValue,
  SelectOption,
} from './types';


export default class StSelectBase extends Vue {
  @Prop()
  value!: BaseSelectValue;

  // Watch on `value` doesn't work in extended classes without this
  @Watch('value')
  onValueChange(): void {}

  @Prop(Boolean)
  multiple!: boolean;

  @Prop(Array)
  options!: SelectOption[];

  @Prop(String)
  optionClass?: string;

  @Prop(String)
  placeholder!: string;

  @Prop(Boolean)
  disabled!: boolean;

  @Prop(Boolean)
  readonly!: boolean;

  @Prop(Boolean)
  required!: boolean;

  @Prop(Boolean)
  clearable!: boolean;

  @Prop(Boolean)
  loading!: boolean;

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

  @Prop({ type: Boolean, default: true })
  closeOnClear!: boolean;

  @Prop({ type: Boolean, default: true })
  closeOnSelect!: boolean;

  @Prop({ type: Object, default: () => {} })
  dropdownProps!: DropdownBindProperties;

  @Prop({ type: Object, default: () => {} })
  collapserPopperProps!: DropdownBindProperties;
}

import {
  Prop,
  Vue,
} from 'vue-property-decorator';

import { DropdownBindProperties } from '../dropdown/types';
import { SelectOption } from './types';

export default class StSelectBase extends Vue {
  @Prop(Array)
  options!: SelectOption[];

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
  clearIconAsSuffixIcon!: boolean;

  @Prop({ type: Boolean, default: true })
  closeOnClear!: boolean;

  @Prop({ type: Boolean, default: true })
  closeOnSelect!: boolean;

  @Prop({ type: Object, default: () => {} })
  dropdownProps!: DropdownBindProperties;

  @Prop({ type: Object, default: () => {} })
  collapserPopperProps!: DropdownBindProperties;
}

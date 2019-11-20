import merge from 'lodash/merge';
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';

import StPopper from '../../popper/index.vue';
import StPopperScript from '../../popper/script';
import {
  PopperBindProperties,
  PopperPlacement,
  TriggerType,
} from '../../popper/types';
import StScrollbar from '../../scrollbar/index.vue';
import { SelectOption } from '../types';


@Component({
  name: 'StSelectDropdown',
  components: {
    StPopper,
    StScrollbar,
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

  get popperClassName(): string {
    return [
      'st-select-dropdown',
      this.popperClass,
      this.extendedPopperProps.popperClass,
    ].filter(Boolean).join(' ');
  }

  beforeMount() {
    merge(this.extendedPopperProps, this.popperProps);
  }

  select(option: SelectOption) {
    if (this.readonly || option.disabled) { return; }
    this.$emit('select', option);
    if (this.closeOnSelect) {
      this.closePopper();
    }
  }

  openPopper() {
    (this.$refs.popper as StPopperScript).doShow();
  }

  closePopper() {
    (this.$refs.popper as StPopperScript).doClose();
  }
}

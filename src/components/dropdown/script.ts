import merge from 'lodash/merge';
import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';

import StPopperScript from '../popper/script';
import {
  PopperBindProperties,
  PopperPlacement,
  TriggerType,
} from '../popper/types';


@Component({
  name: 'StDropdown',
})
export default class StDropdown extends Vue {
  @Prop({ type: Object, default: () => {} })
  popperProps!: PopperBindProperties;

  @Prop(String)
  popperClass!: string;

  @Prop(Boolean)
  popperValue!: boolean;

  @Prop(Boolean)
  disabled!: boolean;

  @Prop(Boolean)
  readonly!: boolean;

  extendedPopperProps: PopperBindProperties = {
    arrowVisible: false,
    placement: PopperPlacement.bottom,
    trigger: TriggerType.click,
    boundariesSelector: 'body',
    appendToBody: false,
  };

  get popperClassName(): string {
    return [
      'st-dropdown__popper',
      this.popperClass,
      this.extendedPopperProps.popperClass,
    ].filter(Boolean).join(' ');
  }

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

  open(): void {
    (this.$refs.popper as StPopperScript).doShow();
  }

  close(): void {
    (this.$refs.popper as StPopperScript).doClose();
  }
}

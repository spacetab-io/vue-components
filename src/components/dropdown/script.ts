import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';

import StPopperScript from '../popper/script';
import {
  PopperPlacement,
  TriggerType,
} from '../popper/types';


@Component({
  name: 'StDropdown',
})
export default class StDropdown extends Vue {
  @Prop(String)
  popperClass?: string;

  @Prop(Boolean)
  value!: boolean;

  @Prop(Number)
  width?: number;

  @Prop(Boolean)
  useReferenceWidth?: boolean;

  @Prop(Number)
  maxHeight?: number;

  @Prop({ type: String, default: 'body' })
  boundariesSelector?: string;

  @Prop({ type: Boolean, default: true })
  withBorder!: boolean;

  @Prop({ type: Boolean, default: false })
  arrowVisible!: boolean;

  @Prop({ type: String, default: PopperPlacement.bottomStart })
  placement!: string;

  @Prop({ type: Boolean, default: true })
  appendToBody!: boolean;

  @Prop({ type: String, default: TriggerType.click })
  trigger!: TriggerType;

  @Prop({ type: Boolean, default: false })
  stopPropagation!: boolean;

  @Prop({ type: Boolean, default: false })
  preventDefault!: boolean;

  @Prop({ type: Boolean, default: false })
  forceShow!: boolean;

  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  @Prop(String)
  enterActiveClass?: string;

  @Prop({ type: Number, default: 100 })
  delayOnMouseOut!: number;

  @Prop({ type: Number, default: 100 })
  delayOnMouseOver!: number;

  @Prop(String)
  leaveActiveClass?: string;

  @Prop({ type: String, default: '' })
  transition!: string;

  $refs!: {
    popper: StPopperScript,
  }

  open(): void {
    this.$refs.popper.doShow();
  }

  close(): void {
    this.$refs.popper.doClose();
  }
}

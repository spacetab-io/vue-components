import {
  Component,
  Prop,
  toNative,
  Vue,
} from 'vue-facing-decorator';

import StPopper from '../popper/index.vue';
import {
  PopperPlacement,
  TriggerType,
} from '../popper/types';

@Component({
  components: {
    StPopper,
  },
})
class StTooltip extends Vue {
  @Prop({ type: String})
  rawContent?: string;

  @Prop({ type: String, default: 'span' })
  tag!: string;

  @Prop({ type: String})
  enterActiveClass?: string;

  @Prop({ type: Number, default: 100 })
  delayOnMouseOver!: number;

  @Prop({ type: Number})
  width?: number;

  @Prop({ type: Number, default: 100 })
  delayOnMouseOut!: number;

  @Prop({ type: String})
  boundariesSelector?: string;

  @Prop({ type: Boolean, default: true })
  arrowVisible!: boolean;

  @Prop({ type: String})
  leaveActiveClass?: string;

  @Prop({ type: String, default: '' })
  transition!: string;

  @Prop({ type: String, default: PopperPlacement.auto })
  placement!: string;

  @Prop({ type: Boolean, default: false })
  appendToBody!: boolean;

  @Prop({ type: [Object, Element] })
  reference?: Element;

  @Prop({ type: String, default: TriggerType.hover })
  trigger!: TriggerType;

  @Prop({ type: Boolean, default: false })
  stopPropagation!: boolean;

  @Prop({ type: Boolean, default: false })
  preventDefault!: boolean;

  @Prop({ type: Boolean, default: false })
  forceShow!: boolean;

  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  @Prop({ type: Boolean, default: false })
  withBorder!: boolean;

  @Prop({ type: String})
  popperClass?: string;

  @Prop({ type: String})
  content?: string;

  @Prop({ type: Boolean})
  value!: boolean;

  get popperClasses(): string {
    return [
      'st-tooltip',
      this.popperClass,
    ].filter(Boolean).join(' ');
  }
}

export default toNative(StTooltip);
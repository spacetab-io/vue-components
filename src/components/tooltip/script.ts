import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';

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
export default class StTooltip extends Vue {
  @Prop(String)
  rawContent?: string;

  @Prop({ type: String, default: 'span' })
  tag!: string;

  @Prop(String)
  enterActiveClass?: string;

  @Prop({ type: Number, default: 100 })
  delayOnMouseOver!: number;

  @Prop(Number)
  width?: number;

  @Prop({ type: Number, default: 100 })
  delayOnMouseOut!: number;

  @Prop(String)
  boundariesSelector?: string;

  @Prop({ type: Boolean, default: true })
  arrowVisible!: boolean;

  @Prop(String)
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

  @Prop(String)
  popperClass?: string;

  @Prop(String)
  content?: string;

  @Prop(Boolean)
  value!: boolean;

  get popperClasses(): string {
    return [
      'st-tooltip',
      this.popperClass,
    ].filter(Boolean).join(' ');
  }
}

import VTooltip from 'v-tooltip';
import { Component, Prop, Vue } from 'vue-property-decorator';

import { PLACEMENTS, TRIGGERS } from './utils';


Vue.use(VTooltip, {
  defaultClass: 'st-tooltip',
  defaultTargetClass: 'st-tooltip',
  defaultArrowSelector: '.st-tooltip__arrow',
  defaultInnerSelector: '.st-tooltip__inner',
  defaultLoadingClass: 'st-tooltip--loading',
  defaultTemplate: `
    <div class="st-tooltip" role="tooltip">
      <div class="st-tooltip__arrow"></div>
      <div class="st-tooltip__inner"></div>
    </div>`,
  popover: {
    defaultClass: 'st-popover',
    defaultBaseClass: 'st-popover',
    defaultWrapperClass: 'st-popover__wrapper',
    defaultInnerClass: 'st-popover__inner',
    defaultArrowClass: 'st-popover__arrow',
    defaultOpenClass: 'st-popover--active',
  },
});

export * from './utils';

@Component({
  name: 'StPopover',
  inheritAttrs: false,
})
export default class StPopover extends Vue {
  @Prop(Boolean)
  open!: boolean;

  @Prop(Boolean)
  disabled!: boolean;

  @Prop({
    type: String,
    default: PLACEMENTS.AUTO,
    validator: prop => Object.values(PLACEMENTS).includes(prop),
  })
  placement!: string;

  @Prop({
    type: Object,
    default: () => ({ show: 0, hide: 300 }),
  })
  delay!: object;

  @Prop({
    type: String,
    default: `${TRIGGERS.HOVER} ${TRIGGERS.FOCUS}`,
    validator: prop => Object.values(TRIGGERS).includes(prop),
  })
  trigger!: string;

  @Prop(Number)
  offset!: number;

  @Prop(String)
  container!: string;

  @Prop(HTMLElement)
  boundariesElement!: HTMLElement;

  @Prop(Object)
  popperOptions!: object;

  @Prop([String, Object, Array])
  popoverClass!: string;

  @Prop([String, Object, Array])
  popoverBaseClass!: string;

  @Prop([String, Object, Array])
  popoverWrapperClass!: string;

  @Prop([String, Object, Array])
  popoverArrowClass!: string;

  @Prop([String, Object, Array])
  popoverInnerClass!: string;

  @Prop(Boolean)
  autoHide!: boolean;

  @Prop(Boolean)
  handleResize!: boolean;

  @Prop(String)
  openGroup!: string;

  @Prop(String)
  openClass!: string;

  get listeners(): object {
    return this.$listeners || {};
  }
}

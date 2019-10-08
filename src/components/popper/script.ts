import Popper, { Placement, PopperOptions } from 'popper.js';
import { VNode } from 'vue';
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';

import { PopperPlacement, TriggerType } from './types';

@Component({
  name: 'StPopper',
})
export default class StPopper extends Vue {
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

  @Prop({ type: Object })
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

  @Watch('value')
  onValueChanged(val: boolean) {
    if (this.trigger !== TriggerType.manual) return;

    if (val) {
      this.doShow();
      return;
    }

    this.doClose();
  }

  @Watch('showPopper')
  onShowPopperChange(val: boolean) {
    if (val) {
      this.$emit('show', this);
      if (this.popperJs) {
        this.popperJs.enableEventListeners();
      }
      this.updatePopper();
      return;
    }

    if (this.popperJs) {
      this.popperJs.disableEventListeners();
    }
    this.$emit('hide', this);
  }

  @Watch('forceShow', { immediate: true })
  onForceShowChange(val: boolean) {
    if (val) {
      return this.doShow();
    }
    this.doClose();
  }

  @Watch('disabled')
  onDisabledChange(val: boolean) {
    if (val) {
      this.showPopper = false;
    }
  }

  referenceElement!: Element;

  popper!: Element;

  showPopper: boolean = false;

  timer?: number;

  popperJs?: Popper;

  appendedToBody: boolean = false;

  arrowElement!: Element;

  popperOptions: PopperOptions = {};

  destroyed() {
    this.destroyPopper();
  }

  destroyPopper() {
    this.referenceElement.removeEventListener('click', this.doToggle);
    this.referenceElement.removeEventListener('mouseup', this.doClose);
    this.referenceElement.removeEventListener('mousedown', this.doShow);
    this.referenceElement.removeEventListener('focus', this.doShow);
    this.referenceElement.removeEventListener('blur', this.doClose);
    this.referenceElement.removeEventListener('mouseout', this.onMouseOut);
    this.referenceElement.removeEventListener('mouseover', this.onMouseOver);
    document.removeEventListener('click', this.handleDocumentClick);
    this.showPopper = false;
    this.doDestroy();
  }

  mounted() {
    this.referenceElement = this.reference || (this.$slots.reference as VNode[])[0].elm as Element;
    this.popper = this.$refs.popper as Element;

    switch (this.trigger) {
      case TriggerType.click:
        this.referenceElement.addEventListener('click', this.doToggle);
        document.addEventListener('click', this.handleDocumentClick);
        break;
      case TriggerType.hover:
        this.referenceElement.addEventListener('mouseover', this.onMouseOver);
        this.referenceElement.addEventListener('mouseout', this.onMouseOut);
        this.popper.addEventListener('mouseover', this.onMouseOver);
        this.popper.addEventListener('mouseout', this.onMouseOut);
        break;
      case TriggerType.focus:
        this.referenceElement.addEventListener('focus', this.onMouseOver);
        this.referenceElement.addEventListener('blur', this.onMouseOut);
        this.popper.addEventListener('focus', this.onMouseOver);
        this.popper.addEventListener('blur', this.onMouseOut);
        break;
    }
  }

  handleDocumentClick(event: Event) {
    if (!this.$el
      || !this.referenceElement
      || !this.popper
      || this.elementContains(this.$el, (event.target as Node))
      || this.elementContains(this.referenceElement, (event.target as Node))
      || this.elementContains(this.popper, (event.target as Node))
    ) {
      return;
    }
    this.$emit('documentClick', this);

    if (this.forceShow) {
      return;
    }
    this.showPopper = false;
  }

  appendArrow(element: Element) {
    if (this.arrowElement) {
      return;
    }
    const arrow = document.createElement('div');
    arrow.setAttribute('x-arrow', '');
    arrow.className = 'st-popper__arrow';
    element.appendChild(arrow);
    this.arrowElement = arrow;
  }

  elementContains(elm: Node, otherElm: Node) {
    return elm.contains(otherElm);
  }

  createPopper() {
    this.$nextTick(() => {
      if (this.arrowVisible) {
        this.appendArrow(this.popper);
      }

      if (this.appendToBody) {
        this.appendedToBody = true;
        document.body.append(this.popperElement);
      }

      if (this.popperJs) {
        this.popperJs.destroy();
        this.popperJs = void 0;
      }

      if (this.boundariesSelector) {
        const boundariesElement = document.querySelector(this.boundariesSelector);

        if (boundariesElement) {
          this.popperOptions.modifiers = Object.assign({}, this.popperOptions.modifiers);
          this.popperOptions.modifiers.preventOverflow = Object.assign(
            {},
            this.popperOptions.modifiers.preventOverflow,
          );
          this.popperOptions.modifiers.preventOverflow.boundariesElement = boundariesElement;
        }
      }

      this.popperOptions.placement = (this.placement as Placement);

      this.popperOptions.onCreate = () => {
        this.$emit('created', this);
        this.$nextTick(this.updatePopper);
      };

      this.popperJs = new Popper(this.referenceElement, this.popper, this.popperOptions);
    });
  }

  updatePopper() {
    if (this.popperJs) {
      return this.popperJs.scheduleUpdate();
    }
    this.createPopper();
  }

  doToggle(event: Event) {
    if (this.stopPropagation) {
      event.stopPropagation();
    }
    if (this.preventDefault) {
      event.preventDefault();
    }
    if (!this.forceShow && !this.disabled) {
      this.showPopper = !this.showPopper;
    }
  }

  doShow() {
    this.showPopper = true;
  }

  doClose() {
    this.showPopper = false;
  }

  doDestroy() {
    if (this.showPopper) {
      return;
    }
    if (this.popperJs) {
      this.popperJs.destroy();
      this.popperJs = void 0;
    }
    if (this.appendedToBody && this.popper.parentElement) {
      this.appendedToBody = false;
      document.body.removeChild(this.popper.parentElement);
    }
  }

  onMouseOver() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.showPopper = true;
    }, this.delayOnMouseOver);
  }

  onMouseOut() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.showPopper = false;
    }, this.delayOnMouseOut);
  }

  get popperElement(): Node {
    return (this.$slots.default as VNode[])[0].elm as Node;
  }

  get popperClasses() {
    return {
      'st-popper--bordered': this.withBorder,
      'st-popper--with-arrow': this.arrowVisible,
      [`${this.popperClass}`]: !!this.popperClass,
    };
  }

  get popperStyles() {
    if (!this.width) {
      return {};
    }

    return {
      width: `${this.width}px`,
    };
  }
}

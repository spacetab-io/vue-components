import Popper, {
  Data,
  Modifiers,
  Placement,
  PopperOptions,
} from 'popper.js';
import { VNode } from 'vue';
import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';

import {
  PopperPlacement,
  TriggerType,
} from './types';


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

  @Prop(Boolean)
  useReferenceWidth?: boolean;

  @Prop(Number)
  maxHeight?: number;

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

  @Prop({ type: Boolean, default: true })
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

  $refs!: {
    popper: Element,
    popperRoot: Element,
  };

  popperParent!: Element;

  referenceElement!: Element;

  showPopper: boolean = false;

  timer?: number;

  popperJs?: Popper;

  appendedToBody: boolean = false;

  arrowElement!: Element;

  popperOptions: PopperOptions = {};

  beforeDestroy() {
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
    this.referenceElement = this.reference || ((this.$slots.reference as VNode[])[0].elm as Element);
    this.popperParent = this.$refs.popper.parentElement || this.$refs.popperRoot;

    switch (this.trigger) {
      case TriggerType.click:
        this.referenceElement.addEventListener('click', this.doToggle);
        document.addEventListener('click', this.handleDocumentClick);
        break;
      case TriggerType.hover:
        this.referenceElement.addEventListener('mouseover', this.onMouseOver);
        this.referenceElement.addEventListener('mouseout', this.onMouseOut);
        this.$refs.popper.addEventListener('mouseover', this.onMouseOver);
        this.$refs.popper.addEventListener('mouseout', this.onMouseOut);
        break;
      case TriggerType.focus:
        this.referenceElement.addEventListener('focus', this.onMouseOver);
        this.referenceElement.addEventListener('blur', this.onMouseOut);
        this.$refs.popper.addEventListener('focus', this.onMouseOver);
        this.$refs.popper.addEventListener('blur', this.onMouseOut);
        break;
      case TriggerType.manual:
        document.addEventListener('click', this.handleManualDocumentClick);
        break;
    }
  }

  checkElementRelativity(element: Node): boolean {
    return (!this.$el
      || !this.referenceElement
      || !this.$refs.popper
      || this.elementContains(this.$el, (element))
      || this.elementContains(this.referenceElement, (element))
      || this.elementContains(this.$refs.popper, (element))
    );
  }

  handleManualDocumentClick(event: Event): void {
    if (this.checkElementRelativity(event.target as Node)) {
      return;
    }
    this.$emit('document-click', this);
  }

  handleDocumentClick(event: Event): void {
    if (this.checkElementRelativity(event.target as Node)) {
      return;
    }
    this.$emit('document-click', this);

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
        this.appendArrow(this.$refs.popper);
      }

      if (this.appendToBody) {
        this.appendedToBody = true;
        document.body.append(this.$refs.popper);
      }

      if (this.popperJs) {
        this.popperJs.destroy();
        this.popperJs = void 0;
      }

      const modifiers: Modifiers = { ...this.popperOptions.modifiers };

      if (this.boundariesSelector) {
        const boundariesElement = document.querySelector(this.boundariesSelector);

        if (boundariesElement) {
          modifiers.preventOverflow = { ...modifiers.preventOverflow };
          modifiers.preventOverflow.boundariesElement = boundariesElement;
        }
      }

      if (this.useReferenceWidth && !this.width) {
        modifiers.applyReferenceWidth = {
          enabled: true,
          fn: this.applyReferenceWidth,
          order: 840,
        };
      }

      if (!this.useReferenceWidth) {
        modifiers.applyReferenceWidth = {
          enabled: false,
        };
      }

      this.popperOptions.modifiers = modifiers;
      this.popperOptions.placement = (this.placement as Placement);

      this.popperOptions.onCreate = () => {
        this.$emit('created', this);
        this.$nextTick(this.updatePopper);
      };

      this.popperOptions.onUpdate = () => {
        this.$nextTick(this.updatePopper);
      };

      this.popperJs = new Popper(this.referenceElement, this.$refs.popper, this.popperOptions);
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
    if (this.appendedToBody && this.$refs.popper.parentElement) {
      this.appendedToBody = false;
      this.popperParent.appendChild(this.$refs.popper);
    }
  }

  onMouseOver() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (!this.disabled) {
        this.showPopper = true;
      }
    }, this.delayOnMouseOver);
  }

  onMouseOut() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.showPopper = false;
    }, this.delayOnMouseOut);
  }

  applyReferenceWidth(data: Data): Data {
    const { width, left } = data.offsets.reference;
    const updatedData = { ...data };

    updatedData.styles.width = `${width.toString()}px`;
    updatedData.offsets.popper.width = width;

    if ([
      PopperPlacement.top,
      PopperPlacement.bottom,
    ].includes(data.placement as PopperPlacement)) {
      updatedData.offsets.popper.left = left;
    }

    return updatedData;
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
    return {
      width: this.width ? `${this.width}px` : void 0,
      maxHeight: this.maxHeight ? `${this.maxHeight}px` : void 0,
    };
  }
}

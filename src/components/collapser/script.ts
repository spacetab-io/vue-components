import debounce from 'lodash/debounce';
import merge from 'lodash/merge';
import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';

import StPopper from '../popper/index.vue';
import StPopperScript from '../popper/script';
import {
  PopperBindProperties,
  PopperPlacement,
  TriggerType,
} from '../popper/types';


const CALCULATOR_LIST_CLASS_NAME = 'st-collapser__list--calculator';
const ELEMENT_CLASS_NAME = 'st-collapser__item';
const HIDDEN_ELEMENT_MODIFIER = 'hidden';
const HIDDEN_ELEMENT_CLASS_NAME = `${ELEMENT_CLASS_NAME}--${HIDDEN_ELEMENT_MODIFIER}`;
const DEBOUNCE_DELAY = 150;

@Component({
  name: 'StCollapser',
  components: {
    StPopper,
  },
})
export default class StCollapser extends Vue {
  @Prop({ type: Array, default: () => [] })
  elements!: any[];

  @Prop({ type: String, default: '' })
  listClass!: string;

  @Prop({ type: String, default: '' })
  elementClass!: string;

  @Prop({ type: String, default: '' })
  controlClass!: string;

  @Prop({ type: String, default: '' })
  popperWrapperClass!: string;

  @Prop({ type: String, default: '' })
  popperClass!: string;

  @Prop({ type: String, default: '' })
  hiddenListClass!: string;

  @Prop({ type: String, default: '' })
  hiddenElementClass!: string;

  @Prop({ type: Object, default: () => {} })
  popperProps!: PopperBindProperties;

  public hiddenElements: any[] = [];

  public popperVisible = false;

  public extendedPopperProps: PopperBindProperties = {
    arrowVisible: false,
    placement: PopperPlacement.bottom,
    trigger: TriggerType.hover,
    boundariesSelector: 'body',
    stopPropagation: true,
  };

  @Watch('elements', { deep: true })
  onElementsChange() {
    this.debounceCollapse();
  }

  @Watch('hiddenElements', { deep: true })
  onHiddenElementsChange(value: any[]) {
    if (!value.length) {
      this.closePopper();
    }
    this.$emit('hidden-elements-change', value.length);
  }

  get debounceCollapse() {
    return debounce(this.collapse, DEBOUNCE_DELAY);
  }

  get popperClassName(): string {
    return ['st-collapser__popper', this.popperClass].filter(Boolean).join(' ');
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.debounceCollapse);
  }

  beforeMount() {
    merge(this.extendedPopperProps, this.popperProps);
  }

  mounted() {
    this.initResizeListener();
    this.debounceCollapse();
  }

  public initResizeListener() {
    window.addEventListener('resize', this.debounceCollapse);
  }

  public collapse() {
    this.closePopper();
    if (!this.elements.length) {
      this.hiddenElements = [];
      return;
    }

    const wrapper = this.$el as HTMLElement;
    const list = this.$refs.list as HTMLElement;
    const availableListWidth = wrapper.offsetWidth - this.getControlWidth();
    const calculationElement = this.createCalculationElement();
    let elementIndex = 0;

    document.body.append(calculationElement);
    while (calculationElement.offsetWidth < availableListWidth && elementIndex < list.children.length) {
      const child = list.children[elementIndex] as HTMLElement;
      const childClone = child.cloneNode(true) as HTMLElement;
      this.showElement(childClone);
      calculationElement.appendChild(childClone);
      if (calculationElement.offsetWidth > availableListWidth) {
        this.hideElements(elementIndex);
        calculationElement.removeChild(childClone);
        break;
      }
      this.showElement(child);
      elementIndex++;
    }
    calculationElement.remove();
    this.hiddenElements = this.elements.slice(elementIndex, this.elements.length);
  }

  public getControlWidth(): number {
    const control = this.$refs.control as HTMLElement;
    const { offsetWidth } = control;
    const controlStyles = window.getComputedStyle(control);
    const summedStylesWidth = [
      controlStyles.marginLeft,
      controlStyles.marginRight,
      controlStyles.borderLeftWidth,
      controlStyles.borderRightWidth,
    ].reduce((acc: number, item: string|null) => acc + (item ? parseFloat(item) : 0), 0);
    return offsetWidth + summedStylesWidth;
  }

  private createCalculationElement(): HTMLElement {
    const $list = this.$refs.list as HTMLElement;
    const calculatorDiv = document.createElement('div');
    calculatorDiv.setAttribute('class', $list.getAttribute('class') || '');
    calculatorDiv.classList.add(CALCULATOR_LIST_CLASS_NAME);
    return calculatorDiv;
  }

  private getElementClassName(index: number): string[] {
    return [ELEMENT_CLASS_NAME, this.elementClass]
      .filter(Boolean)
      .reduce((acc: string[], name: string) => {
        acc.push(name);
        if (index !== 0) {
          acc.push(`${name}--${HIDDEN_ELEMENT_MODIFIER}`);
        }
        return acc;
      }, []);
  }

  public hideElements(from: number = 0) {
    const list = this.$refs.list as HTMLElement;
    for (let i = from; i < list.children.length; i++) {
      const child = list.children[i] as HTMLElement;
      this.hideElement(child);
    }
  }

  public showElement(child: HTMLElement) {
    const updatedChild = child;
    if (child.classList.contains(ELEMENT_CLASS_NAME)) {
      updatedChild.classList.remove(HIDDEN_ELEMENT_CLASS_NAME);
    } else {
      updatedChild.style.display = '';
    }
  }

  public hideElement(child: HTMLElement) {
    const updatedChild = child;
    if (child.classList.contains(ELEMENT_CLASS_NAME)) {
      updatedChild.classList.add(HIDDEN_ELEMENT_CLASS_NAME);
    } else {
      updatedChild.style.display = 'none';
    }
  }

  public closePopper() {
    (this.$refs.popper as StPopperScript).doClose();
  }
}

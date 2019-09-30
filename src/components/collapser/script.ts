import debounce from 'lodash/debounce';
import merge from 'lodash/merge';
import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';

import {
  PopperBindProperties,
  PopperPlacement,
  TriggerType,
} from '../popper/types';


const CALCULATOR_LIST_CLASS_NAME = 'st-collapser__list--calculator';
const DEBOUNCE_DELAY = 200;

@Component({
  name: 'StCollapser',
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
  popperClass!: string;

  @Prop({ type: String, default: '' })
  hiddenListClass!: string;

  @Prop({ type: String, default: '' })
  hiddenElementClass!: string;

  @Prop({ type: Object, default: () => {} })
  popperProps!: PopperBindProperties;

  hiddenElements: any[] = [];

  popperVisible = false;

  extendedPopperProps: PopperBindProperties = {
    arrowVisible: false,
    placement: PopperPlacement.bottom,
    trigger: TriggerType.hover,
    boundariesSelector: 'body',
  };

  @Watch('elements', { deep: true })
  onElementsChange() {
    this.debounceCollapse();
  }

  @Watch('hiddenElements', { deep: true })
  onHiddenElementsChange(value: any[]) {
    this.$emit('hidden-elements-change', value.length);
  }

  get debounceCollapse() {
    return debounce(this.collapse, DEBOUNCE_DELAY);
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

  initResizeListener() {
    window.addEventListener(
      'resize',
      this.debounceCollapse,
    );
  }

  collapse() {
    if (!this.elements.length) {
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
      childClone.style.display = '';
      calculationElement.appendChild(childClone);
      if (calculationElement.offsetWidth > availableListWidth) {
        this.hideListElements(elementIndex);
        calculationElement.removeChild(childClone);
        break;
      }
      child.style.display = '';
      elementIndex++;
    }
    calculationElement.remove();
    this.hiddenElements = this.elements.slice(elementIndex, this.elements.length);
  }

  getControlWidth(): number {
    const control = this.$refs.control as HTMLElement;
    const { offsetWidth } = control;
    const { marginLeft, marginRight } = window.getComputedStyle(control);
    return offsetWidth + parseFloat(marginLeft || '0') + parseFloat(marginRight || '0');
  }

  createCalculationElement(): HTMLElement {
    const $list = this.$refs.list as HTMLElement;
    const calculatorDiv = document.createElement('div');
    calculatorDiv.setAttribute('class', $list.getAttribute('class') || '');
    calculatorDiv.classList.add(CALCULATOR_LIST_CLASS_NAME);
    return calculatorDiv;
  }

  hideListElements(from: number = 0) {
    const list = this.$refs.list as HTMLElement;
    for (let i = from; i < list.children.length; i++) {
      const child = list.children[i] as HTMLElement;
      child.style.display = 'none';
    }
  }
}

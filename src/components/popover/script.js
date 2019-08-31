import Vue from 'vue';
import VTooltip from 'v-tooltip';
import { PLACEMENTS, TRIGGERS } from './utils';


Vue.use(VTooltip);

export default {
  name: 'StPopover',
  inheritAttrs: false,
  props: {
    open: Boolean,
    disabled: Boolean,
    placement: {
      type: String,
      default: PLACEMENTS.AUTO,
      validator: prop => Object.values(PLACEMENTS).includes(prop),
    },
    delay: {
      type: Object,
      default: () => ({ show: 0, hide: 300 }),
    },
    trigger: {
      type: String,
      default: `${TRIGGERS.HOVER} ${TRIGGERS.FOCUS}`,
      validator: prop => Object.values(TRIGGERS).includes(prop),
    },
    offset: Number,
    container: String,
    boundariesElement: HTMLElement,
    popperOptions: Object,
    popoverClass: [String, Object, Array],
    popoverBaseClass: [String, Object, Array],
    popoverWrapperClass: [String, Object, Array],
    popoverArrowClass: [String, Object, Array],
    popoverInnerClass: [String, Object, Array],
    autoHide: Boolean,
    handleResize: Boolean,
    openGroup: Boolean,
    openClass: Boolean,
  },
  computed: {
    props() {
      return {
        ...this.$props,
        ...this.attrs,
      };
    },
    listeners() {
      return this.$listeners || {};
    },
  },
};

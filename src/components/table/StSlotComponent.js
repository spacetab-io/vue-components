
export default {
  name: 'StSlotComponent',
  props: {
    component: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      default: 'default',
    },
    scoped: {
      type: Boolean,
    },
    props: {
      type: Object,
    },
    event: {
      type: String,
      default: 'hook:updated',
    },
  },
  created() {
    if (this.isVueComponent()) {
      this.component.$on(this.event, this.refresh);
    }
  },
  beforeDestroy() {
    if (this.isVueComponent()) {
      this.component.$off(this.event, this.refresh);
    }
  },
  render(createElement) {
    if (!this.isVueComponent()) return;

    const childrens = this.scoped
      ? this.component.$scopedSlots[this.name](this.props)
      : this.component.$slots[this.name];

    return createElement(childrens);
  },
  methods: {
    refresh() {
      this.$forceUpdate();
    },
    isVueComponent() {
      /* eslint-disable-next-line */
      return this.component && this.component._isVue;
    },
  },
};

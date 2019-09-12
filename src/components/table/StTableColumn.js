
export default {
  name: 'BTableColumn',
  inheritAttrs: false,
  props: {
    label: String,
    customKey: [String, Number],
    centered: Boolean,
    visible: {
      type: Boolean,
      default: true,
    },
    internal: Boolean,
  },
  data() {
    return {
      newKey: this.customKey || this.label,
    };
  },
  methods: {
    addRefToTable() {
      /* eslint-disable-next-line */
      if (!this.$parent.$data._isTable) {
        this.$destroy();
        throw new Error('You should wrap StTableColumn on a StTable');
      }

      if (this.internal) return;
      const repeated = this.$parent.columns.some(({ newKey }) => newKey === this.newKey);
      if (!repeated) this.$parent.columns.push(this);
    },
  },
  beforeMount() {
    this.addRefToTable();
  },
  beforeUpdate() {
    this.addRefToTable();
  },
  beforeDestroy() {
    const index = this.$parent.columns.map(column => column.newKey).indexOf(this.newKey);

    if (index >= 0) this.$parent.columns.splice(index, 1);
  },
};

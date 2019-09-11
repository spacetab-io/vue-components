
export default {
  name: 'BTableColumn',
  inheritAttrs: false,
  props: {
    label: String,
    customKey: [String, Number],
    // field: String,
    // meta: [String, Number, Boolean, Function, Object, Array],
    // width: [Number, String],
    // numeric: Boolean,
    centered: Boolean,
    // sortable: Boolean,
    visible: {
      type: Boolean,
      default: true,
    },
    // customSort: Function,
    internal: Boolean,
  },
  data() {
    return {
      newKey: this.customKey || this.label,
    };
  },
  computed: {
    rootClasses() {
      return {
        'has-text-centered': this.centered,
      };
    },
  },
  methods: {
    addRefToTable() {
      /* eslint-disable-next-line */
      if (!this.$parent.$data._isTable) {
        this.$destroy();
        throw new Error('You should wrap StTableColumn on a StTable');
      }

      if (this.internal) return;
      const repeated = this.$parent.newColumns.some(({ newKey }) => newKey === this.newKey);
      if (!repeated) this.$parent.newColumns.push(this);
    },
  },
  beforeMount() {
    this.addRefToTable();
  },
  beforeUpdate() {
    this.addRefToTable();
  },
  beforeDestroy() {
    const index = this.$parent.newColumns.map(column => column.newKey).indexOf(this.newKey);

    if (index >= 0) this.$parent.newColumns.splice(index, 1)
  },
};

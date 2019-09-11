import get from 'lodash/get';
import StSlotComponent from './StSlotComponent';
import StTableColumn from './StTableColumn.vue';


export default {
  name: 'StTable',
  components: {
    StSlotComponent,
    StTableColumn,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    bordered: Boolean,
    selected: Object,
    defaultSort: [String, Array],
    defaultSortDirection: {
      type: String,
      default: 'asc',
    },
    rowClass: {
      type: Function,
      default: () => '',
    },
    customRowKey: String,
  },
  data() {
    return {
      newColumns: [...this.columns],
      newData: this.data,
      newDataTotal: this.data.length,
      currentSortColumn: {},
      isAsc: true,
      firstTimeSort: true, // Used by first time initSort
      _isTable: true, // Used by TableColumn
    };
  },
  computed: {
    tableClasses() {
      return {
        'is-bordered': this.bordered,
      };
    },
    visibleData() {
      return this.newData;
    },
    visibleColumns() {
      if (!this.newColumns) return this.newColumns;
      return this.newColumns.filter(({ visible }) => visible !== false);
    },
    hasSortablenewColumns() {
      return this.newColumns.some(_ => _.sortable);
    },
    columnCount() {
      return this.newColumns.length;
    },
  },
  watch: {
    data(value) {
      const { newColumns } = this;
      this.newColumns = [];
      this.newData = value;

      // Prevent table from being headless, data could change and created hook
      // on column might not trigger
      this.$nextTick(() => {
        if (!this.newColumns.length) this.newColumns = newColumns;
      });

      this.sort(this.currentSortColumn, true);
      this.newDataTotal = value.length;
    },
    columns(value) {
      this.newColumns = [...value];
    },
    newColumns: 'checkSort',
  },
  mounted() {
    this.checkSort();
  },
  methods: {
    getRowValue(row, column, index) {
      if (typeof column.field === 'function') {
        return column.field.call(this.$parent, row, column, index);
      }

      return get(row, column.field);
    },
    sortBy(array, key, fn, isAsc) {
      // Sorting without mutating original data
      if (fn && typeof fn === 'function') {
        return [...array].sort((a, b) => fn(a, b, isAsc));
      }

      const sorted = [...array].sort((a, b) => {
        let newA = get(a, key);
        let newB = get(b, key);

        if (typeof newA === 'boolean' && typeof newB === 'boolean') {
          return isAsc ? newA - newB : newB - newA;
        }

        if (!newA && newA !== 0) return 1;
        if (!newB && newB !== 0) return -1;
        if (newA === newB) return 0;

        newA = (typeof newA === 'string')
          ? newA.toUpperCase()
          : newA;

        newB = (typeof newB === 'string')
          ? newB.toUpperCase()
          : newB;

        const result = (newA > newB ? 1 : -1);
        return isAsc ? result : -result;
      });

      return sorted;
    },
    sort(column, updatingData = false) {
      if (!column || !column.sortable) return;

      if (!updatingData) {
        this.isAsc = column === this.currentSortColumn
          ? !this.isAsc
          : (this.defaultSortDirection.toLowerCase() !== 'desc');
      }

      if (!this.firstTimeSort) {
        this.$emit('sort', column.field, this.isAsc ? 'asc' : 'desc');
      }

      this.newData = this.sortBy(
        this.newData,
        column.field,
        column.customSort,
        this.isAsc,
      );

      this.currentSortColumn = column;
    },
    checkSort() {
      if (this.newColumns.length && this.firstTimeSort) {
        this.initSort();
        this.firstTimeSort = false;
      } else if (this.newColumns.length) {
        if (!this.currentSortColumn.field) return;

        for (let i = 0; i < this.newColumns.length; i++) {
          if (this.newColumns[i].field === this.currentSortColumn.field) {
            this.currentSortColumn = this.newColumns[i];
          }
        }
      }
    },
    selectRow(row) {
      this.$emit('click', row);
      if (this.selected === row) return;
      this.$emit('select', row, this.selected);
      this.$emit('update:selected', row);
    },
    hasCustomFooterSlot() {
      if (this.$slots.footer.length > 1) return true;
      const { tag } = this.$slots.footer[0];
      return ['th', 'td'].includes(tag);
    },
    initSort() {
      if (!this.defaultSort) return;

      let sortField = '';
      let sortDirection = this.defaultSortDirection;
      if (Array.isArray(this.defaultSort)) {
        /* eslint-disable-next-line */
        sortField = this.defaultSort[0];
        if (this.defaultSort[1]) {
        /* eslint-disable-next-line */
        sortDirection = this.defaultSort[1];
        }
      } else {
        sortField = this.defaultSort;
      }

      this.newColumns.forEach((column) => {
        if (column.field === sortField) {
          this.isAsc = sortDirection.toLowerCase() !== 'desc';
          this.sort(column, true);
        }
      });
    },
  },
};

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
      newData: this.data,
      currentSortCol: {},
      isAsc: true,
      firstTimeSort: true, // Used by first time initSort
      _isTable: true, // Used by TableColumn
    };
  },
  watch: {
    data(value) {
      this.newData = value;
      this.sort(this.currentSortCol, true);
    },
    columns: 'checkSort',
  },
  mounted() {
    this.checkSort();
  },
  methods: {
    getRowValue(row, col, index) {
      if (typeof col.field === 'function') {
        return col.field.call(this.$parent, row, col, index);
      }

      return get(row, col.field);
    },
    sortBy(array, key, fn, isAsc) {
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
    sort(col, updatingData = false) {
      if (!col || !col.sortable) return;

      if (!updatingData) {
        this.isAsc = col === this.currentSortCol
          ? !this.isAsc
          : (this.defaultSortDirection.toLowerCase() !== 'desc');
      }

      if (!this.firstTimeSort) {
        this.$emit('sort', col.field, this.isAsc ? 'asc' : 'desc');
      }

      this.newData = this.sortBy(
        this.newData,
        col.field,
        col.sort,
        this.isAsc,
      );

      this.currentSortCol = col;
    },
    checkSort() {
      if (this.columns.length && this.firstTimeSort) {
        this.initSort();
        this.firstTimeSort = false;
      } else if (this.columns.length) {
        if (!this.currentSortCol.field) return;

        for (let i = 0; i < this.columns.length; i++) {
          if (this.columns[i].field === this.currentSortCol.field) {
            this.currentSortCol = this.columns[i];
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

      this.columns.forEach((column) => {
        if (column.field === sortField) {
          this.isAsc = sortDirection.toLowerCase() !== 'desc';
          this.sort(column, true);
        }
      });
    },
  },
};

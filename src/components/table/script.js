import get from 'lodash/get';

import StSlotComponent from './StSlotComponent';
import StTableColumn from './StTableColumn.vue';
import { SortDirections } from './typings';

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
    sortBy: String,
    clientSorting: Boolean,
    sortDirection: {
      type: String,
      default: SortDirections.asc,
      validate: prop => Object.values(SortDirections).includes(prop),
    },
    rowClass: {
      type: Function,
      default: () => '',
    },
    customRowKey: String,
  },
  data() {
    return {
      isAsc: this.sortDirection !== SortDirections.desc,
      newData: this.data,
      currentSortColumn: {},
      firstTimeSort: true, // Used by first time initSort
      _isTable: true, // Used by TableColumn
    };
  },
  watch: {
    data(value) {
      this.newData = value;
      this.sort(this.currentSortColumn, true);
    },
    sortBy(value) {
      this.currentSortColumn = this.columns.find(_ => _.field === value) || {};
    },
    sortDirection(value) {
      this.isAsc = value !== SortDirections.desc;
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
    sortedBy(array, key, fn, isAsc) {
      if (fn && typeof fn === 'function') {
        return [...array].sort((a, b) => (
          fn(get(a, key), get(b, key), a, b, this.sortDirection)
        ));
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

      const isAsc = col === this.currentSortColumn
        ? !this.isAsc
        : (this.sortDirection.toLowerCase() !== SortDirections.desc);

      if (!this.clientSorting) {
        const sortDirection = isAsc ? SortDirections.asc : SortDirections.desc;
        this.$emit('sort', col.field, sortDirection);
        return;
      }

      if (!updatingData) {
        this.isAsc = isAsc;
      }

      this.newData = this.sortedBy(
        this.newData,
        col.field,
        col.sort,
        this.isAsc,
      );

      this.currentSortColumn = col;
    },
    checkSort() {
      if (!this.clientSorting) return;

      if (this.columns.length && this.firstTimeSort) {
        this.initSort();
        this.firstTimeSort = false;
      } else if (this.columns.length) {
        if (!this.currentSortColumn.field) return;

        for (let i = 0; i < this.columns.length; i++) {
          if (this.columns[i].field === this.currentSortColumn.field) {
            this.currentSortColumn = this.columns[i];
          }
        }
      }
    },
    initSort() {
      if (!this.clientSorting) return;

      if (!this.sortBy) return;
      const column = this.columns.find(_ => _.field === this.sortBy);
      this.sort(column, true);
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
  },
};

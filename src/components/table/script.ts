import get from 'lodash/get';
import values from 'lodash/values';
import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';

import { Column, SortDirection, SortEvent } from './types';


@Component({
  name: 'StTable',
  inheritAttrs: false,
})
export default class StTable extends Vue {
  @Prop({ type: Array, default: () => [] })
  data!: any[];

  @Prop({ type: Array, default: () => [] })
  columns!: Column[];

  @Prop(Boolean)
  bordered!: boolean;

  @Prop(Object)
  selected!: {};

  @Prop(String)
  sortBy!: string;

  @Prop(Boolean)
  clientSorting!: boolean;

  @Prop({
    type: String,
    default: SortDirection.asc,
    validator: prop => values(SortDirection).includes(prop),
  })
  sortDirection!: SortDirection;

  @Prop({ type: Function, default: () => '' })
  rowClass!: () => string;

  @Prop(String)
  customRowKey!: string;

  isAsc: boolean = true;

  newData!: any[];

  currentSortColumn: any = {};

  firstTimeSort: boolean = true; // Used by first time initSort

  @Watch('data')
  onDataChange(value: any[]) {
    this.newData = value;

    if (this.clientSorting) {
      this.sort(this.currentSortColumn);
    }
  }

  @Watch('sortBy')
  onSortByChange(value: string) {
    this.currentSortColumn = this.columns.find(_ => _.field === value) || {};
  }

  @Watch('sortDirection')
  onSortDirectionChange(value: string) {
    this.isAsc = value !== SortDirection.desc;
  }

  @Watch('columns')
  onColumnsChange() {
    this.checkSort();
  }

  created() {
    this.isAsc = this.sortDirection !== SortDirection.desc;
    this.newData = this.data;
    this.checkSort();
  }

  getRowValue(row: any, col: Column, index: number) {
    if (typeof col.field === 'function') {
      return col.field.call(this.$parent, row, col, index);
    }

    return get(row, col.field);
  }

  sortedBy(array: any[], field: string | Function, fn?: Function, isAsc: boolean = false) {
    const isFnField: boolean = typeof field === 'function';

    if (fn && typeof fn === 'function') {
      return [...array].sort((a: any, b: any) => {
        const aValue = isFnField ? (field as Function)(a) : get(a, (field as string));
        const bValue = isFnField ? (field as Function)(b) : get(b, (field as string));
        return fn(aValue, bValue, a, b, this.sortDirection);
      });
    }

    const sorted = [...array].sort((a, b) => {
      let newA = isFnField ? (field as Function)(a) : get(a, (field as string));
      let newB = isFnField ? (field as Function)(b) : get(b, (field as string));

      if (typeof newA === 'boolean' && typeof newB === 'boolean') {
        newA = newA ? 1 : 0;
        newB = newB ? 1 : 0;
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
  }

  sort(col: Column) {
    if (!col || !col.sortable) return;

    let sortDirection;
    if (col !== this.currentSortColumn) {
      this.isAsc = true;
      sortDirection = SortDirection.asc;
      this.currentSortColumn = col;
    } else if (this.isAsc) {
      this.isAsc = false;
      sortDirection = SortDirection.desc;
      this.currentSortColumn = col;
    } else {
      this.isAsc = true;
      this.currentSortColumn = {};
    }

    if (!this.clientSorting) {
      const sortBy = sortDirection && col.name;
      const event: SortEvent = { sortBy, direction: sortDirection };
      this.$emit('sort', event, col);
    } else if (sortDirection) {
      this.newData = this.sortedBy(
        this.newData,
        col.field,
        col.sort,
        this.isAsc,
      );
    } else {
      this.newData = this.data;
    }
  }

  checkSort() {
    if (this.columns.length && this.firstTimeSort) {
      this.initSort();
      this.firstTimeSort = false;
    } else if (this.columns.length) {
      if (!this.currentSortColumn.field) return;

      const column = this.columns.find(_ => _.field === this.currentSortColumn.field);
      this.currentSortColumn = column;
    }
  }

  initSort() {
    if (!this.sortBy) return;
    const column = this.columns.find(_ => _.field === this.sortBy);
    if (column) this.sort(column);
  }

  selectRow(row: any) {
    this.$emit('click', row);
    if (this.selected === row) return;
    this.$emit('select', row, this.selected);
    this.$emit('update:selected', row);
  }

  getWidth(col: Column): string {
    if (col.width === void 0) return '';

    return typeof col.width === 'string'
      ? col.width
      : `${col.width}px`;
  }

  hasCustomFooterSlot() {
    const footer = (this.$slots.footer as any);
    if (footer.length > 1) return true;
    const { tag } = footer[0];
    return tag && ['th', 'td'].includes(tag);
  }
}

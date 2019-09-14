import get from 'lodash/get';
import values from 'lodash/values';
import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';

import { Column, SortDirections } from './typings';


export * from './typings';

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
    default: SortDirections.asc,
    validator: prop => values(SortDirections).includes(prop),
  })
  sortDirection!: SortDirections;

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
    this.sort(this.currentSortColumn);
  }

  @Watch('sortBy')
  onSortByChange(value: string) {
    this.currentSortColumn = this.columns.find(_ => _.field === value) || {};
  }

  @Watch('sortDirection')
  onSortDirectionChange(value: string) {
    this.isAsc = value !== SortDirections.desc;
  }

  @Watch('columns')
  onColumnsChange() {
    this.checkSort();
  }

  created() {
    this.isAsc = this.sortDirection !== SortDirections.desc;
    this.newData = this.data;
    this.checkSort();
  }

  getRowValue(row: {}, col: Column, index: number) {
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

    const isAsc = col === this.currentSortColumn
      ? !this.isAsc
      : (this.sortDirection.toLowerCase() !== SortDirections.desc);

    if (!this.clientSorting) {
      const sortDirection = isAsc ? SortDirections.asc : SortDirections.desc;
      this.$emit('sort', col.field, sortDirection);
      return;
    }

    this.isAsc = isAsc;

    this.newData = this.sortedBy(
      this.newData,
      col.field,
      col.sort,
      this.isAsc,
    );

    this.currentSortColumn = col;
  }

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
  }

  initSort() {
    if (!this.clientSorting) return;

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

  hasCustomFooterSlot() {
    const footer = (this.$slots.footer as any);
    if (footer.length > 1) return true;
    const { tag } = footer[0];
    return tag && ['th', 'td'].includes(tag);
  }
}

/* eslint object-curly-newline: 0 */

import { storiesOf } from '@storybook/vue'
import { boolean } from '@storybook/addon-knobs';
import { template } from '../../templates/table/default.template';
import documentation from '../../documentation/table.md'


const columns = [
  { label: '#', name: '#', field: (row, col, index) => index + 1, class: 'col-class-#' },
  { label: 'ID', name: 'id', field: 'id', class: 'col-class-id' },
  { label: 'Label 1', name: 'name_1', field: 'key_1', sortable: true, class: 'col-class-name_1' },
  { label: 'Label 2', name: 'name_2', field: 'key_2', sortable: true },
  { label: 'Label 3', name: 'name_3', field: 'key_3', centered: true, class: 'col-class-name_3', width: '120px' },
  { label: 'Label 4', name: 'name_4', field: 'key_4', style: { color: 'green' }, renderHtml: true, width: 120 },
];

const data = [8, 2, 5, 6, 7, 1, 9, 3, 4]
  .map((id, index) => ({
    id: index,
    key_1: `data1 for key ${id}`,
    key_2: `data2 for key ${id}`,
    key_3: `data3 for key ${id}`,
    key_4: `<b>data4</b> for key ${id}`,
  }));

storiesOf('Components|Table', module).add('Default', () => ({
  template,
  props: {
    bordered: {
      default: boolean('bordered', false),
    },
    'empty slot': {
      default: boolean('empty slot', false),
    },
    'footer slot': {
      default: boolean('footer slot', false),
    },
  },
  data: () => ({
    columns,
    selected: null,
    sortBy: 'key_2',
    sortDirection: 'desc',
  }),
  computed: {
    data() {
      return this['empty slot'] ? [] : data;
    },
    hasFooter() {
      return this['footer slot']
    },
  },
  methods: {
    rowClass(row, index) {
      return [
        `row-class-${index}`,
        { 'is-selected': row === this.selected },
      ];
    },
    onSort(field, direction) {
      this.sortDirection = direction;
      this.sortBy = field;
    },
  },
}), {
  notes: { markdown: documentation },
});

import { storiesOf } from '@storybook/vue'
import { object } from '@storybook/addon-knobs';
import { template } from '../../templates/table/default.template';
import documentation from '../../documentation/table.md'


const columns = [
  { label: 'Label 1', field: 'key_1' },
  { label: 'Label 2', field: 'key_2', sortable: true },
  { label: 'Label 3', field: 'key_3', center: true },
  { label: 'Label 4', field: 'key_4' },
];

const data = [8, 2, 5, 6, 7, 1, 9, 3, 4]
  .map(id => ({
    key_1: `data1 for key ${id}`,
    key_2: `data2 for key ${id}`,
    key_3: `data3 for key ${id}`,
    key_4: `data4 for key ${id}`,
  }));

storiesOf('Components|Table', module).add('Default', () => ({
  template,
  props: {
    columns: {
      default: object('columns', columns),
    },
    data: {
      default: object('data', data),
    },
  },
  data() {
    return {};
  },
}), {
  notes: { markdown: documentation },
});

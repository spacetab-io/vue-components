import { storiesOf } from '@storybook/vue'
import { object } from '@storybook/addon-knobs';
import { template } from '../../templates/table/default.template';
import documentation from '../../documentation/table.md'


const config = [
  { label: 'Label 1', key: 'key_1' },
  { label: 'Label 2', key: 'key_2' },
];

const data = [
  { key_1: 'data for key 1', key_2: 'data for key 2' },
  { key_1: 'data for key 1', key_2: 'data for key 2' },
];

storiesOf('Components|Table', module).add('Default', () => ({
  template,
  props: {
    config: {
      default: object('config', config),
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

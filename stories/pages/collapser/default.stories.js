import { storiesOf } from '@storybook/vue3'
import { boolean, text, array } from '@storybook/addon-knobs';
import { template } from '../../templates/collapser/default.template';
import documentation from '../../documentation/collapser.md'

storiesOf('Components|Collapser', module).add('Default', () => ({
  template,
  props: {},
  data() {
    return {
      elements: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
        'Item 5',
        'Item 6',
        'Item 7',
      ]
    }
  },
}), {
  notes: { markdown: documentation },
});

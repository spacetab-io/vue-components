import { storiesOf } from '@storybook/vue'
import { boolean, text, array } from '@storybook/addon-knobs';
import { template } from '../../templates/dropdown/default.template';
import documentation from '../../documentation/dropdown.md'

storiesOf('Components|Dropdown', module).add('Default', () => ({
  template,
  props: {
    readonly: {
      default: boolean('readonly', false),
    },
    disabled: {
      default: boolean('disabled', false),
    },
  },
  data() {
    return {}
  },
}), {
  notes: { markdown: documentation },
});

import { storiesOf } from '@storybook/vue3'
import { boolean, text } from '@storybook/addon-knobs';
import { template } from '../../templates/checkbox/default.template';
import checkboxNotes from '../../documentation/checkbox.md'

storiesOf('Components|Checkbox', module).add('Default', () => ({
  template,
  props: {
    disabled: {
        default: boolean('Disabled', false),
    },
    readonly: {
      default: boolean('Readonly', false),
    },
    indeterminate: {
      default: boolean('indeterminate', false),
    },
    innerText: {
      default: text('Label', 'Checkbox'),
    }
  },
  data() {
    return {
      isChecked: false,
    };
  },
}), {
  notes: checkboxNotes,
});

import { storiesOf } from '@storybook/vue3'
import { boolean, select } from '@storybook/addon-knobs';
import { template } from '../../templates/button-group/default.template';

storiesOf('Components|Button', module).add('Button Group', () => ({
  template,
  props: {
    disabled: {
      default: boolean('Disabled', false),
    },
    type: {
      default: select('Type', ['success', 'warning', 'danger', 'info', 'primary', 'default', 'secondary'], 'primary'),
    },
  },
}));

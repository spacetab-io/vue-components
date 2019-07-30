import { storiesOf } from '@storybook/vue'
import { boolean } from '@storybook/addon-knobs';
import { template } from '../../templates/button-group/default.template';

storiesOf('Components|Button', module).add('Button Group', () => ({
  template,
  props: {
    disabled: {
      default: boolean('Disabled', false),
    }
  },
}));

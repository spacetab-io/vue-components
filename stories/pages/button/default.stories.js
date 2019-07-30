import { storiesOf } from '@storybook/vue';
import {
  boolean,
  radios,
} from '@storybook/addon-knobs';
import { template } from '../../templates/button/default.template';

const ViewOptions = {
  default: '',
  plain: 'plain',
  round: 'round',
};
const SizeOptions = {
  default: '',
  mini: 'mini',
  small: 'small',
  medium: 'medium',
  large: 'large',
  'extra-Large': 'extra-large'
};
storiesOf('Components|Button', module).add('Default', () => ({
  template: `<div>${template}</div>`,
  props: {
    disabled: {
      default: boolean('Disabled', false),
    },
    loading: {
      default: boolean('Loading', false),
    },
    view: {
      default: radios('View', ViewOptions, ''),
    },
    size: {
      default: radios('Size', SizeOptions, ''),
    }
  },
}));
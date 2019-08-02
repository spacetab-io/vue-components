import { storiesOf } from '@storybook/vue';
import {
  boolean,
  radios,
} from '@storybook/addon-knobs';
import { template } from '../../templates/button/default.template';

import { sizeOptions } from '../../utils/props-options';

const ViewOptions = {
  default: '',
  plain: 'plain',
  round: 'round',
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
      default: radios('Size', sizeOptions, ''),
    }
  },
}));
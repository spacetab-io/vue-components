import { storiesOf } from '@storybook/vue';
import {
  boolean,
  radios,
  select,
  text,
  number,
} from '@storybook/addon-knobs';
import { template } from '../../templates/input/default.template';

import inputDocumentation from '../../documentation/input.md';

import {
  sizeOptions,
  iconsList,
} from '../../utils/props-options';

storiesOf('Components|Input', module).add(
  'Default',
  () => ({
    template: `<div>${template}</div>`,
    props: {
      disabled: {
        default: boolean('disabled', false),
      },
      loading: {
        default: boolean('loading', false),
      },
      size: {
        default: radios('size', sizeOptions, ''),
      },
      type: {
        default: text('type', ''),
      },
      pattern: {
        default: text('pattern', ''),
      },
      placeholder: {
        default: text('placeholder', 'Input placeholder'),
      },
      prefixIcon: {
        default: select('prefixIcon', iconsList, ''),
      },
      suffixIcon: {
        default: select('suffixIcon', iconsList, ''),
      },
      clearIconAsSuffixIcon: {
        default: boolean('clearIconAsSuffixIcon', false),
      },
      required: {
        default: boolean('required', false),
      },
      clearable: {
        default: boolean('clearable', true),
      },
      readonly: {
        default: boolean('readonly', false),
      },
      maxlength: {
        default: number('maxlength'),
      },
    },
  }),
  {
    notes: { markdown: inputDocumentation },
  }
);

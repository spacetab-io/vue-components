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
      required: {
        default: boolean('required', false),
      },
      clearable: {
        default: boolean('clearable', true),
      },
      readonly: {
        default: boolean('readonly', false),
      },
      placeholder: {
        default: text('placeholder', 'Input placeholder'),
      },
      prefixIcon: {
        default: select('prefix-icon', iconsList, ''),
      },
      suffixIcon: {
        default: select('suffix-icon', iconsList, ''),
      },
      focusAfterClear: {
        default: boolean('focus-after-clear', false),
      },
      clearIconAsSuffixIcon: {
        default: boolean('clear-icon-as-suffix-icon', false),
      },
      maxlength: {
        default: number('maxlength'),
      },
      type: {
        default: text('type', ''),
      },
      pattern: {
        default: text('pattern', ''),
      },
      size: {
        default: radios('size', sizeOptions, ''),
      },
    },
  }),
  {
    notes: { markdown: inputDocumentation },
  }
);

import { storiesOf } from '@storybook/vue';
import {
  boolean,
  radios,
  text,
  number,
} from '@storybook/addon-knobs';
import { template } from '../../templates/textarea/default.template';

import textareaDocumentation from '../../documentation/textarea.md';

import {
  sizeOptions,
} from '../../utils/props-options';

storiesOf('Components|Textarea', module).add(
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
      resizable: {
        default: boolean('resizable', true),
      },
      placeholder: {
        default: text('placeholder', 'Textarea placeholder'),
      },
      required: {
        default: boolean('required', false),
      },
      readonly: {
        default: boolean('readonly', false),
      },
      minlength: {
        default: number('minlength'),
      },
      maxlength: {
        default: number('maxlength'),
      },
      autofocus: {
        default: boolean('autofocus', false),
      },
      rows: {
        default: number('rows'),
      },
      cols: {
        default: number('cols'),
      },
    },
  }),
  {
    notes: { markdown: textareaDocumentation },
  }
);

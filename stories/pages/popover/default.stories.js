import { storiesOf } from '@storybook/vue';
import {
  boolean,
  text,
  number,
  select,
} from '@storybook/addon-knobs';
import { template } from '../../templates/popover/default.template';

import popoverDocumentation from '../../documentation/popover.md';
import { TRIGGER_LIST } from '../../../src/components/popover/script';

storiesOf('Components|Popover', module).add(
  'Default',
  () => ({
    template: `<div>${template}</div>`,
    props: {
      trigger: {
        default: select('trigger', TRIGGER_LIST, TRIGGER_LIST[0]),
      },
      openDelay: {
        default: number('openDelay', 0),
      },
      closeDelay: {
        default: number('closeDelay', 0),
      },
      title: {
        default: text('title', 'Пример заголовка'),
      },
      disabled: {
        default: boolean('disabled', false),
      },
      content: {
        default: text('content', 'Пример текста'),
      },
      popperClass: {
        default: text('popperClass', ''),
      },
      width: {
        default: text('width', '240px'),
      },
      visibleArrow: {
        default: boolean('visibleArrow', true),
      },
      arrowOffset: {
        default: number('arrowOffset', 0),
      },
      transition: {
        default: text('transition', 'fade-in-linear'),
      },
      tabindex: {
        default: number('tabindex', 0),
      },
    },
  }),
  {
    notes: { markdown: popoverDocumentation },
  }
);

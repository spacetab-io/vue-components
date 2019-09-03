import { storiesOf } from '@storybook/vue';
import {
  boolean,
  text,
  number,
  select,
  object,
} from '@storybook/addon-knobs';
import { template } from '../../templates/popover/default.template';

import popoverDocumentation from '../../documentation/popover.md';
import { PLACEMENTS, TRIGGERS } from '../../../src/components/popover/utils';


storiesOf('Components|Popover', module).add(
  'Default',
  () => ({
    template: `<div>${template}</div>`,
    props: {
      open: {
        default: boolean('open'),
      },
      disabled: {
        default: boolean('disabled'),
      },
      placement: {
        default: select('placement', Object.values(PLACEMENTS), PLACEMENTS.RIGHT),
      },
      delay: {
        default: object('delay', { show: 0, hide: 300 }),
      },
      trigger: {
        default: select('trigger', Object.values(TRIGGERS), TRIGGERS.CLICK),
      },
      offset: {
        default: number('offset', 0),
      },
      container: {
        default: text('container', 'body'),
      },
      boundariesElement: {
      },
      popperOptions: {
        default: object('popperOptions'),
      },
      popoverClass: {
        default: text('popoverClass'),
      },
      popoverBaseClass: {
        default: text('popoverBaseClass'),
      },
      popoverWrapperClass: {
        default: text('popoverWrapperClass'),
      },
      popoverArrowClass: {
        default: text('popoverArrowClass'),
      },
      popoverInnerClass: {
        default: text('popoverInnerClass'),
      },
      autoHide: {
        default: boolean('autoHide'),
      },
      handleResize: {
        default: boolean('handleResize'),
      },
      openGroup: {
        default: boolean('openGroup'),
      },
      openClass: {
        default: text('openClass'),
      },
    },
  }),
  {
    notes: { markdown: popoverDocumentation },
  },
);

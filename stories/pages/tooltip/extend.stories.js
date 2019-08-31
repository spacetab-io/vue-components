import { storiesOf } from '@storybook/vue';
import {
  boolean,
  text,
  number,
  select,
  object,
} from '@storybook/addon-knobs';
import { template } from '../../templates/tooltip/extend.template';

import popoverDocumentation from '../../documentation/tooltip.md';
import { PLACEMENTS, TRIGGERS } from '../../../src/components/popover/utils';


storiesOf('Directives|Tooltip', module).add(
  'Extend',
  () => ({
    template: `<div>${template}</div>`,
    props: {
      content: {
        default: text('content', 'Tooltip content'),
      },
      classes: {
        default: text('classes'),
      },
      targetClasses: {
        default: text('classes'),
      },
      html: {
        default: boolean('html'),
      },
      delay: {
        default: object('delay', { show: 0, hide: 300 }),
      },
      placement: {
        default: select('placement', Object.values(PLACEMENTS), PLACEMENTS.RIGHT),
      },
      trigger: {
        default: select('trigger', Object.values(TRIGGERS), TRIGGERS.HOVER),
      },
      show: {
        default: boolean('show'),
      },
      offset: {
        default: number('offset', 0),
      },
      container: {
        default: text('container', 'body'),
      },
      boundariesElement: {
      },
      template: {
        default: text('loadingClass'),
      },
      arrowSelector: {
        default: text('arrowSelector'),
      },
      innerSelector: {
        default: text('innerSelector'),
      },
      autoHide: {
        default: boolean('autoHide'),
      },
      hideOnTargetClick: {
        default: boolean('autoHide'),
      },
      loadingClass: {
        default: text('loadingClass'),
      },
      loadingContent: {
        default: text('loadingContent'),
      },
      popperOptions: {
        default: object('popperOptions'),
      },
    },
  }),
  {
    notes: { markdown: popoverDocumentation },
  },
);

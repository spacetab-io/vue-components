import { storiesOf } from '@storybook/vue';
import { text, select } from '@storybook/addon-knobs';

import popoverDocumentation from '../../documentation/tooltip.md';
import { PLACEMENTS } from '../../../src/components/popover/utils';


const divOptions = {
  class: 'storybook-components storybook-components--tooltip',
  style: 'margin-top: 100px; text-align: center'
};

storiesOf('Directives|Tooltip', module).add(
  'Default',
  () => ({
    props: {
      placement: {
        default: select('placement', Object.values(PLACEMENTS), PLACEMENTS.BOTTOM),
      },
      content: {
        default: text('content', 'Tooltip content'),
      },
    },
    data: () => ({
      PLACEMENTS,
    }),
    render(h) {
      const tooltip = { name: 'tooltip', modifiers: { [this.placement]: true }, value: this.content };
      const buttonOptions = { directives: [tooltip], key: this.placement };
      const button = h('button', buttonOptions, `Button ${this.placement}`);
      return h('div', divOptions, [button]);
    },
  }),
  {
    notes: { markdown: popoverDocumentation },
  },
);

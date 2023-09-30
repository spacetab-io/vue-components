import { storiesOf } from '@storybook/vue3';

import RowColNotes from '../../documentation/row-col.md';

const template = `
  <st-row :gutter="gutter">
    <st-col v-for="(col, index) in cols" :key="index" :span="gutter / cols.length">{{ col }}</st-col>
  </st-row>
`;

storiesOf('Components|Row & Col', module).add(
  'Default',
  () => ({
    template: `<div>${template}</div>`,
    data: () => ({
      gutter: 24,
      cols: [
        1.0005,
        2.2000,
        3.0300,
        4.1000,
        5.0005,
        6.2000,
        7.0300,
        8.1000,
      ]
    })
  }),
  {
    notes: { markdown: RowColNotes }
  }
);
import { storiesOf } from '@storybook/vue';
import {
  text,
  color,
} from '@storybook/addon-knobs';
import iconNotes from '../../documentation/icon.md';
import { template } from '../../templates/icon/default.template';

storiesOf('Components|Icon', module).add(
  'Default',
  () => ({
    template: template,
    props: {
      size: {
        default: text('Size', '30px'),
      },
      color: {
        default: color('Color', '#3f4557'),
      },
    },
    computed: {
      iconStyle() {
        return {
          color: this.color,
          width: this.size,
          height: this.size,
        }
      }
    }
  }),
  {
    notes: { markdown: iconNotes }
  },
);

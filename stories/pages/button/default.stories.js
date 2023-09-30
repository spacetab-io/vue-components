import { storiesOf } from '@storybook/vue3'

import {boolean, select, text} from '@storybook/addon-knobs';
import {iconsList, sizeOptions} from "../../utils/props-options";
import notes from '../../documentation/button.md'

const icons = [''];
icons.push(...iconsList);

const template = `
<div>
    <st-button :bold-border="boldBorder" :type="type" :disabled="disabled" :icon="icon" :size="size" :loading="loading" :plain="plain" :round="round" :circle="circle" :cancel="cancel" :remove="remove" :approve="approve" :search="search">{{ buttonContent }}</st-button>
</div>
`;

storiesOf('Components|Button', module).add('Button', () => ({
  template: `<div>${template}</div>`,
  props: {
    buttonContent: {
      default: text('Button content', 'Text button content'),
    },
    type: {
      default: select('Type', ['', 'default', 'text', 'success', 'info', 'danger', 'secondary', 'primary'], 'success'),
    },
    icon: {
      default: select('Icon', icons)
    },
    size: {
      default: select('Size', sizeOptions),
    },
    disabled: {
      default: boolean('Disabled', false),
    },
    loading: {
      default: boolean('Loading', false),
    },
    cancel: {
      default: boolean('Cancel', false),
    },
    remove: {
      default: boolean('Remove', false),
    },
    search: {
      default: boolean('Search', false),
    },
    boldBorder: {
      default: boolean('Bold border', false),
    },
    plain: {
      default: boolean('Plain', false),
    },
    round: {
      default: boolean('Round', false),
    },
    circle: {
      default: boolean('Circle', false),
    },
    approve: {
      default: boolean('Approve', false),
    },
  },
}), {
  notes,
});

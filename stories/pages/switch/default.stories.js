import { storiesOf } from '@storybook/vue'
import { template } from '../../templates/switch/default.template';
import notes from '../../documentation/switch.md'
import { boolean, text, array } from '@storybook/addon-knobs';

storiesOf('Components|Switch', module).add('Default', () => ({
    template,
    props: {
        inactiveText: {
            default: text('Inactive Text', ''),
        },
        activeText: {
            default: text('Active Text', ''),
        },
        disabled: {
            default: boolean('Disabled', false),
        },
    },
    data() {
        return {
            value: void 0,
        };
    },
}), {
    notes,
});

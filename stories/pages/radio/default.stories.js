import { storiesOf } from '@storybook/vue'
import { boolean, text, array } from '@storybook/addon-knobs';
import { template } from '../../templates/radio/default.template';
import checkboxNotes from '../../documentation/radio.md'

storiesOf('Components|Radio', module).add('Default', () => ({
    template,
    props: {
        disabled: {
            default: boolean('Disabled', false),
        },
        options: {
            default: array('Options', ['Hello', 'World', 'Guys']),
        }
    },
    data() {
        return {
            data: void 0,
        };
    },
}), {
    notes: checkboxNotes,
});

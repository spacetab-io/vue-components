import { storiesOf } from '@storybook/vue3';
import { boolean, array } from '@storybook/addon-knobs';
import { template } from '../../templates/radio/default.template';
import checkboxNotes from '../../documentation/radio.md';

storiesOf('Components|Radio', module).add('Default', () => ({
    template,
    props: {
        disabled: {
            default: boolean('Disabled', false),
        },
        readonly: {
          default: boolean('Readonly', false),
        },
        options: {
            default: array('Options', ['Hello', 'World', 'Guys']),
        },
    },
    data() {
        return {
            data: void 0,
        };
    },
}), {
    notes: checkboxNotes,
});

import { storiesOf } from '@storybook/vue'
import { boolean, text, array } from '@storybook/addon-knobs';
import { template } from '../../templates/scrollbar/default.template';
import notes from '../../documentation/scrollbar.md'

storiesOf('Components|Scrollbar', module).add('Default', () => ({
    template,
    props: {
    },
    data() {
        return {};
    },
    methods: {
        createRange(from, to) {
            const numbers = [];
            for (let i = from; i <= to; i++) {
                numbers.push(i);
            }
            return numbers;
        }
    },
}), {
    notes,
});

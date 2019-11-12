import { storiesOf } from '@storybook/vue'
import { number } from '@storybook/addon-knobs';
import { template } from '../../templates/scrollbar/default.template';
import notes from '../../documentation/scrollbar.md'

storiesOf('Components|Scrollbar', module).add('Default', () => ({
    template,
    props: {
        minimumScrollSize: {
            default: number('Minimum scroll size', 40),
        },
        rows: {
            default: number('Test env rows generated', 500),
        },
        cols: {
            default: number('Test env cols generated', 500),
        },
    },
    data() {
        return {
            key: 0,
        };
    },
    watch: {
        minimumScrollSize() {
            this.key += 1;
        },
    },
    methods: {
        createRange(from, to) {
            const numbers = [];
            for (let i = from; i <= to; i++) {
                numbers.push(i);
            }
            return numbers;
        },
    },
}), {
    notes,
});

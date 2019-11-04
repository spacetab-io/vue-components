import { boolean, text, array, number, date } from '@storybook/addon-knobs';
import { template } from '../../templates/inline-datepicker/single.template';
import notes from '../../documentation/inline-datepicker.md'
import moment from 'moment';

const momentFormatDate = (name, value, group) => {
    const val = date(name, value, group);
    return moment(val).format();
};

export const singleStoriesData = {
    name: 'Single',
    vueData: () => ({
        template,
        props: {
            yearRangeStart: {
                default: number('Year start range', moment().year()),
            },
            monthRangeStart: {
                default: number('Month start range', moment().month()),
            },
            panelsCount: {
                default: number('Panels count', 3),
            },
            disabledFrom: {
                default: momentFormatDate(
                    'Disabled From',
                    moment().add(4, 'year').toDate(),
                    'Disabled range',
                ),
            },
            disabledTo: {
                default: momentFormatDate(
                    'Disabled To',
                    moment().subtract(3, 'year').toDate(),
                    'Disabled range',
                ),
            },
            disabledBefore: {
                default: momentFormatDate(
                    'Disabled Before',
                    moment().subtract(20, 'days').toDate(),
                    'Disabled limits'),
            },
            disabledAfter: {
                default: momentFormatDate(
                    'Disabled After',
                    moment().add(20, 'days').toDate(),
                    'Disabled limits'),
            },
            now: {
                default: momentFormatDate('Custom now', void 0),
            },
        },
        data() {
            return {
                value: void 0,
            };
        },
    }),
    additionalData: {
        notes,
    },
};


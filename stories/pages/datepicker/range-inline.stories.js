import { boolean, date, number, select } from '@storybook/addon-knobs';
import { template } from '../../templates/datepicker/range-inline.template';
import notes from '../../documentation/datepicker.md'
import moment from 'moment';
import { NavigationType } from "../../../src/components/datepicker/types";

const momentFormatDate = (name, value, group) => {
    const val = date(name, value, group);
    return moment(val).format();
};

export const rangeInlineStoriesData = {
    name: 'Range Inline',
    vueData: () => ({
        template,
        props: {
            panelsCount: {
                default: number('Panels count', 2),
            },
            disabledFrom: {
                default: momentFormatDate(
                    'Disabled From',
                    moment().add(4, 'year').toDate(),
                ),
            },
            disabledTo: {
                default: momentFormatDate(
                    'Disabled To',
                    moment().subtract(2, 'year').toDate(),
                ),
            },
            now: {
                default: momentFormatDate('Custom now', void 0),
            },
            navigationType: {
                default: select('Navigation type', Object.values(NavigationType), NavigationType.simple)
            },
        },
        data() {
            return {
                value: [],
                disabledRanges: [],
            };
        },
    }),
    additionalData: {
        notes,
    },
};

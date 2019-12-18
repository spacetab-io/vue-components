import { boolean, text, date, number, select } from '@storybook/addon-knobs';
import { template } from '../../templates/datepicker/range.template';
import notes from '../../documentation/datepicker.md'
import moment from 'moment';
import { PopperPlacement, TriggerType } from '../../../src/components/popper/types';
import { NavigationType } from '../../../src/components/datepicker/types';
import { iconsList } from '../../utils/props-options';

const momentFormatDate = (name, value, group) => {
  const val = date(name, value, group);
  return moment(val).format();
};

export const rangeStoriesData = {
  name: 'Range',
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
      inputFormat: {
        default: text('Input date format', 'DD.MM.YYYY'),
      },
      popperPlacement: {
        default: select('Placement', Object.values(PopperPlacement), PopperPlacement.auto)
      },
      triggerType: {
        default: select('Trigger', Object.values(TriggerType), TriggerType.click)
      },
      popperArrowVisible: {
        default: boolean('Popper arrow visibility', true),
      },
      clearable: {
        default: boolean('Clearable', true),
      },
      now: {
        default: momentFormatDate('Custom now', void 0),
      },
      navigationType: {
        default: select('Navigation type', Object.values(NavigationType), NavigationType.simple)
      },
      placeholder: {
        default: text('Placeholder', 'Pick dates'),
      },
      prefixIcon: {
        default: select('prefix-icon', iconsList, ''),
      },
      suffixIcon: {
        default: select('suffix-icon', iconsList, ''),
      },
    },
    data() {
      return {
        value: [],
        disabledRanges: [],
        dpKey: 0,
      };
    },
    watch: {
      popperPlacement() {
        this.dpKey += 1;
      },
      triggerType() {
        this.dpKey += 1;
      },
    },
  }),
  additionalData: {
    notes,
  },
};

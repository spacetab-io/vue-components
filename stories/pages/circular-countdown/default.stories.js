import { storiesOf } from '@storybook/vue'
import { date, object, select } from '@storybook/addon-knobs';
import { template } from '../../templates/circular-countdown/default.template';
import documentation from '../../documentation/circular-countdown.md'
import moment from 'moment';
import { CountdownStatusList } from '../../../src/components/circular-countdown/types';

const momentFormatDate = (name, value, group) => {
  const val = date(name, value.toDate(), group);
  return moment(val).format();
};

const forceStyles = [''];
forceStyles.push(...Object.values(CountdownStatusList));

storiesOf('Components|Circular Countdown', module).add('Default', () => ({
  template,
  props: {
    startDate: {
      default: momentFormatDate('Start date', moment().subtract(1, "day"))
    },
    endDate: {
      default: momentFormatDate('End date', moment().add(1, "hour"))
    },
    forceStyle: {
      default: select('Force countdown styles', forceStyles, forceStyles[0]),
    },
    unitNames: {
      default: object('unit names', {
        day: 'дн',
        hour: 'ч',
        minute: 'мин',
        second: 'ceк',
      })
    },
  },
  data() {
    return {}
  },
}), {
  notes: { markdown: documentation },
});

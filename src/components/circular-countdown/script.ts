import moment, {
  Moment,
  unitOfTime,
} from 'moment';
import {
  Component,
  Emit,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';

import { SimpleClassArray } from '../../types/general';
import {
  CountdownStatusList,
  TimeLeft,
  UnitNames,
} from './types';


@Component({
  name: 'StCircularCountdown',
})
export default class StCircularCountdown extends Vue {
  @Prop({ type: String, required: true })
  startDate!: string;

  @Prop({ type: String, required: true })
  endDate!: string;

  @Prop({ type: String })
  forceStyle?: string;

  @Prop({
    type: Object,
    default: () => ({
      day: 'дн',
      hour: 'ч',
      minute: 'мин',
      second: 'ceк',
    }),
  })
  unitNames!: UnitNames;

  interval?: number;

  now!: Moment;

  timeLeft: TimeLeft = {
    unit: '',
    time: 0,
  };

  circleSize: number = 0;

  currentStatus: CountdownStatusList = CountdownStatusList.info;

  @Emit('timer-ends')
  emitTimerEnds(): void {

  }

  @Watch('startDate')
  onStartDateChanged() {
    this.restartInterval();
  }

  @Watch('endDate')
  onEndDateChanged() {
    this.restartInterval();
  }

  created() {
    this.restartInterval();
  }

  beforeDestroy() {
    clearInterval(this.interval);
  }

  get startMoment(): Moment {
    return moment(this.startDate);
  }

  get endMoment(): Moment {
    return moment(this.endDate);
  }

  get countdownClasses(): SimpleClassArray {
    const currentStatus = this.forceStyle || this.currentStatus;
    return [`st-circular-countdown--${currentStatus}`];
  }

  update(): void {
    this.now = moment();
    this.timeLeft = this.getTimeLeft();
    this.circleSize = this.getCircleSize();
    this.currentStatus = this.getStatus();
  }

  getCircleSize(): number {
    const fullRangeDatesDiff = this.endMoment.diff(this.startMoment, 'millisecond');
    const leftRangeDatesDiff = this.endMoment.diff(this.now, 'millisecond');

    const percents = leftRangeDatesDiff > 0
      ? 100 - (100 / fullRangeDatesDiff * leftRangeDatesDiff)
      : 100;

    return ((100 - percents) / 100) * 113.097;
  }

  getTimeLeft(): TimeLeft {
    const diffDays = this.getTimeLeftByUnit('day');
    if (diffDays >= 1) {
      return {
        time: diffDays,
        unit: this.unitNames.day,
      };
    }

    const diffHours = this.getTimeLeftByUnit('hour');
    if (diffHours >= 1) {
      return {
        time: diffHours,
        unit: this.unitNames.hour,
      };
    }

    const diffMinutes = this.getTimeLeftByUnit('minute');
    if (diffMinutes >= 1) {
      return {
        time: diffMinutes,
        unit: this.unitNames.minute,
      };
    }

    const diffSeconds = this.getTimeLeftByUnit('second');
    return {
      time: diffSeconds,
      unit: this.unitNames.second,
    };
  }

  getStatus(): CountdownStatusList {
    const secondsLeft = this.getTimeLeftByUnit('second');
    if (secondsLeft <= 60 * 60) {
      return CountdownStatusList.danger;
    }

    if (secondsLeft <= 60 * 60 * 24) {
      return CountdownStatusList.warning;
    }

    return CountdownStatusList.success;
  }

  getTimeLeftByUnit(unit: unitOfTime.Diff): number {
    return Math.max(Math.floor(this.endMoment.diff(this.now, unit)), 0);
  }

  restartInterval() {
    clearInterval(this.interval);

    this.interval = setInterval(() => {
      this.update();

      if (this.endMoment.diff(this.now, 'millisecond') < 1000) {
        clearInterval(this.interval);
      }
    }, 1000);
    this.update();
  }
}

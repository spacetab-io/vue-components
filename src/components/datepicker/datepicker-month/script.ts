import moment, { Moment } from 'moment';
import {
  Component,
  Emit,
  Prop,
  toNative,
  Vue, Watch,
} from 'vue-facing-decorator';

import StDatepickerNavigationSlider from '../datepicker-navigation-slider/index.vue';
import StDatepickerSimpleGrid from '../datepicker-simple-grid/index.vue';
import StDatepickerYear from '../datepicker-year/index.vue';
import {
  DisabledRange,
} from '../types';
import { DatepickerUtils } from '../utils';
import { MonthSelectGridItem } from './types';


@Component({
  name: 'StDatepickerMonth',
  components: {
    StDatepickerSimpleGrid,
    StDatepickerNavigationSlider,
    StDatepickerYear,
  },
})
class StDatepickerMonth extends Vue {
  @Prop({ type: String, required: true })
  now!: string;

  @Prop({ type: String, required: true })
  value!: string;

  @Prop({ type: String})
  disabledTo?: string;

  @Prop({ type: String})
  disabledFrom?: string;

  @Prop({ type: Array })
  disabledRanges?: DisabledRange[];

  @Emit('input')
  emitInput(item: string): string {
    return item;
  }

  @Watch('value')
  onValueChanged() {
    this.yearOffset = 0;

    if (this.yearSelectOpened) {
      this.yearSelectOpened = false;
    }
  }

  yearSelectOpened: boolean = false;

  monthLabels: string[] = [];

  yearOffset: number = 0;

  prevPageAllowed: boolean = true;

  nextPageAllowed: boolean = true;

  created() {
    this.monthLabels = moment.localeData().monthsShort();
  }

  get momentNow(): Moment {
    return moment(this.now);
  }

  get currentDate(): Moment {
    if (!DatepickerUtils.isDateValid(this.value)) {
      return this.momentNow;
    }

    return moment(this.value);
  }

  get validStartDate(): Moment {
    const startDate = this.currentDate.clone();

    return startDate.add(this.yearOffset, 'year').startOf('year');
  }

  get gridMonth(): MonthSelectGridItem[] {
    const items: MonthSelectGridItem[] = [];

    const startDate = this.validStartDate;

    for (let i = 0; i < 12; i++) {
      const monthDate = startDate
        .clone()
        .add(i, 'month')
        .startOf('month');

      items.push({
        value: monthDate.format(),
        label: this.monthLabels[i],
        disabled: DatepickerUtils.isDateDisabled({
          date: monthDate,
          unit: 'month',
          disabledFrom: this.disabledFrom,
          disabledTo: this.disabledTo,
          disabledRanges: this.disabledRanges,
        }),
      });
    }

    return items;
  }

  get yearNavigationLabel(): string {
    return String(this.validStartDate.year());
  }

  get isPagePrevAllowed(): boolean {
    if (!DatepickerUtils.isDateValid(this.disabledTo)) {
      return true;
    }

    return this.validStartDate
      .isAfter(this.disabledTo);
  }

  get isPageNextAllowed(): boolean {
    if (!DatepickerUtils.isDateValid(this.disabledFrom)) {
      return true;
    }

    return this.validStartDate
      .clone()
      .endOf('year')
      .isBefore(this.disabledFrom);
  }

  get gridValue(): string {
    return this.currentDate.clone().startOf('month').format();
  }

  onYearLabelClicked(): void {
    this.yearSelectOpened = true;
  }
}

export default toNative(StDatepickerMonth);
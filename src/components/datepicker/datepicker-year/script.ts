import moment, { Moment } from 'moment';
import {
  Component,
  Emit,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';

import StDatepickerNavigationSlider from '../datepicker-navigation-slider/index.vue';
import StDatepickerSimpleGrid from '../datepicker-simple-grid/index.vue';
import { SimpleGridItem } from '../datepicker-simple-grid/types';
import { DisabledRange } from '../types';
import { DatepickerUtils } from '../utils';

type YearGridItem = SimpleGridItem<string>;


@Component({
  components: {
    StDatepickerSimpleGrid,
    StDatepickerNavigationSlider,
  },
})
export default class StDatepickerYear extends Vue {
  @Prop({ type: String, required: true })
  now!: string;

  @Prop({ type: String, required: true })
  value!: string;

  @Prop(String)
  disabledTo?: string;

  @Prop(String)
  disabledFrom?: string;

  @Prop(Array)
  disabledRanges?: DisabledRange[];

  offset: number = 0;

  navigationLabel: string = '';

  prevPageAllowed: boolean = true;

  nextPageAllowed: boolean = true;

  @Watch('value')
  watchValue() {
    this.offset = 0;
  }

  @Emit('input')
  emitInput(item: string): string {
    const selectedDateDisabled = DatepickerUtils.isDateDisabled({
      date: moment(item),
      disabledFrom: this.disabledFrom,
      disabledTo: this.disabledTo,
      disabledRanges: this.disabledRanges,
      unit: 'day',
    });

    if (selectedDateDisabled && DatepickerUtils.isDateValid(this.disabledTo)) {
      return moment(item).isBefore(this.disabledTo) ? this.disabledTo : item;
    }

    return item;
  }

  get gridValue() {
    return this.momentCurrent.clone().startOf('year').format();
  }

  get momentNow(): Moment {
    return moment();
  }

  get momentCurrent(): Moment {
    if (!this.value) {
      return this.momentNow;
    }

    const selectedMoment = moment(this.value);

    return selectedMoment.isValid() ? selectedMoment : this.momentNow;
  }

  get gridYears(): YearGridItem[] {
    const items: YearGridItem[] = [];

    const currentYear = this.momentCurrent.year();
    const yearsOffset = this.offset * 10;
    const startYear = (currentYear + yearsOffset) - (currentYear % 10);
    const endYear = startYear + 9;

    const startYearMoment = moment({
      year: startYear,
    }).startOf('year');
    const endYearMoment = moment({
      year: endYear,
    }).startOf('year');

    this.setNavigationLabel(startYear, endYear);
    this.calculatePageLimits(startYearMoment, endYearMoment);

    for (let i = startYear; i <= endYear; i++) {
      const momentYear = moment({
        year: i,
      }).startOf('year');

      items.push({
        value: momentYear.format(),
        label: String(i),
        disabled: DatepickerUtils.isDateDisabled({
          date: momentYear,
          unit: 'year',
          disabledRanges: this.disabledRanges,
          disabledTo: this.disabledTo,
          disabledFrom: this.disabledFrom,
        }),
      });
    }

    return items;
  }

  calculatePageLimits(currentFromYear: Moment, currentToYear: Moment) {
    this.nextPageAllowed = this.isPageNextAllowed(currentToYear);
    this.prevPageAllowed = this.isPagePrevAllowed(currentFromYear);
  }

  isPagePrevAllowed(fromYear: Moment): boolean {
    if (!DatepickerUtils.isDateValid(this.disabledTo)) {
      return true;
    }

    return fromYear.isBefore(this.disabledTo);
  }

  isPageNextAllowed(toYear: Moment) {
    if (!DatepickerUtils.isDateValid(this.disabledFrom)) {
      return true;
    }

    return toYear.isAfter(this.disabledFrom);
  }

  setNavigationLabel(fromYear: number, toYear: number): void {
    this.navigationLabel = `${fromYear} - ${toYear}`;
  }
}

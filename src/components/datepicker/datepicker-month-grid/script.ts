import moment, { Moment } from 'moment';
import {
  Component,
  Emit,
  Prop,
  Vue,
} from 'vue-property-decorator';

import { SimpleClassList } from '../../../types/general';
import { DisabledRange } from '../types';
import { DatepickerUtils } from '../utils';
import { SpacePriority } from './types';


@Component({
  name: 'StDatepickerMonthGrid',
})
export default class StDatepickerMonthGrid extends Vue {
  @Prop({ required: true, type: Number })
  month!: number;

  @Prop({ required: true, type: Number })
  year!: number;

  @Prop({ type: String, default: SpacePriority.BOTTOM })
  spacePriority!: SpacePriority;

  @Prop({ type: String, required: true })
  now!: string;

  @Prop({ type: Boolean, default: false })
  removeNeedlessRows!: boolean;

  @Prop(String)
  selectedFrom?: string;

  @Prop(String)
  selectedTo?: string;

  @Prop(String)
  disabledFrom?: string;

  @Prop(String)
  disabledTo?: string;

  @Prop(Array)
  disabledRanges?: DisabledRange[];

  @Prop({ type: Boolean, default: true })
  monthBadgeVisibility!: boolean;

  @Emit('day-selected')
  emitDayClicked(day: Moment): string {
    return day.format();
  }

  @Emit('day-hovered')
  emitDayHovered(day: Moment): string {
    return day.format();
  }

  formatDayCircle(day: Moment): string {
    return day.format('D');
  }

  isStartSelectRangeDay(day: Moment): boolean {
    if (!this.selectedFrom || !this.selectedTo) {
      return false;
    }

    return day.isSame(this.selectedFrom, 'date');
  }

  isEndSelectRangeDay(day: Moment): boolean {
    if (!this.selectedFrom || !this.selectedTo) {
      return false;
    }

    return day.isSame(this.selectedTo, 'date');
  }

  isInSelectRange(day: Moment): boolean {
    if (!this.selectedFrom || !this.selectedTo || this.isStartSelectRangeDay(day) || this.isEndSelectRangeDay(day)) {
      return false;
    }

    return day.isBetween(this.selectedFrom, this.selectedTo, 'date');
  }

  isCurrentMonth(day: Moment): boolean {
    return day.get('month') === this.month;
  }

  isCurrentDay(day: Moment): boolean {
    return this.momentNow.isSame(day, 'date');
  }

  isEndOfWeek(day: Moment): boolean {
    const endWeekDay = day.clone().endOf('week');
    return endWeekDay.isSame(day, 'date');
  }

  isStartOfWeek(day: Moment): boolean {
    const startWeekDay = day.clone().startOf('week');
    return startWeekDay.isSame(day, 'date');
  }

  isEndOfMonth(day: Moment): boolean {
    const endMonthDay = day.clone().endOf('month');
    return endMonthDay.isSame(day, 'date');
  }

  isStartOfMonth(day: Moment): boolean {
    const startMonthDay = day.clone().startOf('month');
    return startMonthDay.isSame(day, 'date');
  }

  gridItemClasses(day: Moment): SimpleClassList {
    const isDisabled = this.isDayDisabled(day);
    const isCurrentMonth = this.isCurrentMonth(day);
    const isCurrentDay = isCurrentMonth && this.isCurrentDay(day);
    const isStartSelectRange = isCurrentMonth && this.isStartSelectRangeDay(day);
    const isEndSelectRange = isCurrentMonth && this.isEndSelectRangeDay(day);
    const isSelected = isStartSelectRange || isEndSelectRange;
    const isSelectionStart = isStartSelectRange && !isEndSelectRange;
    const isSelectionEnd = isEndSelectRange && !isStartSelectRange;
    const isInSelectRange = isCurrentMonth && this.isInSelectRange(day);
    const isSelectionRounded = isInSelectRange && !isSelected && (
      this.isStartOfWeek(day) || this.isEndOfWeek(day) || this.isStartOfMonth(day) || this.isEndOfMonth(day)
    );
    const selectionLeftRounded = isSelectionRounded && (this.isStartOfWeek(day) || this.isStartOfMonth(day));
    const selectionRightRounded = isSelectionRounded && (this.isEndOfWeek(day) || this.isEndOfMonth(day));

    return {
      'st-datepicker-month-grid__item--not-current-month': !isCurrentMonth,
      'st-datepicker-month-grid__item--current-day': isCurrentDay,
      'st-datepicker-month-grid__item--disabled': isDisabled,
      'st-datepicker-month-grid__item--selected': isSelected,
      'st-datepicker-month-grid__item--selection-start': isSelectionStart,
      'st-datepicker-month-grid__item--selection-end': isSelectionEnd,
      'st-datepicker-month-grid__item--in-select-range': isInSelectRange,
      'st-datepicker-month-grid__item--selection-left-rounded': selectionLeftRounded,
      'st-datepicker-month-grid__item--selection-right-rounded': selectionRightRounded,
    };
  }

  isDayDisabled(day: Moment): boolean {
    return DatepickerUtils.isDateDisabled({
      unit: 'date',
      disabledTo: this.disabledTo,
      disabledFrom: this.disabledFrom,
      disabledRanges: this.disabledRanges,
      date: day,
    });
  }

  onDayItemClicked(day: Moment) {
    if (this.isDayDisabled(day)) {
      return;
    }

    this.emitDayClicked(day);
  }

  onDayItemMouseOver(day: Moment) {
    if (this.isDayDisabled(day)) {
      return;
    }

    this.emitDayHovered(day);
  }

  get firstMonthDay(): Moment {
    return moment({
      year: this.year,
      month: this.month,
    }).startOf('month');
  }

  get lastMonthDay(): Moment {
    return moment({
      year: this.year,
      month: this.month,
    }).endOf('month');
  }

  get momentNow(): Moment {
    return moment(this.now);
  }

  get days(): Moment[] {
    const days: Moment[] = [];

    let firstGridWeek = this.firstMonthDay.week();
    let lastGridWeek = this.lastMonthDay.week();

    if (firstGridWeek > lastGridWeek) {
      const weeksYear = this.firstMonthDay.clone().endOf('year').diff(
        this.firstMonthDay.clone().startOf('year'),
        'weeks',
      );
      lastGridWeek += weeksYear;
    }

    const weeksInMonth = lastGridWeek - firstGridWeek + 1;
    let weeksInGrid = weeksInMonth;

    if (!this.removeNeedlessRows) {
      weeksInGrid = 6;
      if (this.spacePriority === SpacePriority.TOP) {
        firstGridWeek -= weeksInGrid - weeksInMonth;
      }
    }

    const weekStart = moment({
      year: this.year,
    }).week(firstGridWeek)
      .startOf('week');

    for (let i = 0; i < weeksInGrid * 7; i++) {
      days.push(
        weekStart.clone().add(i, 'days'),
      );
    }

    return days;
  }

  get groupedDays(): Moment[][] {
    const days: Moment[][] = [];
    const chunk = 7;
    for (let i = 0, j = this.days.length; i < j; i += chunk) {
      days.push(this.days.slice(i, i + chunk));
    }
    return days;
  }

  get monthName(): string {
    return this.firstMonthDay.format('MMMM');
  }

  get gridYear(): number {
    return this.firstMonthDay.year();
  }

  get weekDayNames(): string[] {
    return moment.localeData().weekdaysMin();
  }
}

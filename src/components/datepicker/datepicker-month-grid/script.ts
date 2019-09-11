import moment, { Moment } from 'moment';
import {
  Component, Emit, Prop, Vue,
} from 'vue-property-decorator';

import { SpacePriority } from './types';

@Component({
  name: 'StDatepickerMonthGrid',
})
export default class StDatepickerMonthGrid extends Vue {
    @Prop({ required: true, type: Number })
  month!: number;

    @Prop({ required: true, type: Number })
    year!: number;

    @Prop({ required: false, type: String, default: SpacePriority.BOTTOM })
    spacePriority!: SpacePriority;

    @Prop({ required: false, type: Object, default: () => moment() })
    now!: Moment;

    @Prop({ required: false, type: Boolean, default: false })
    removeNeedlessRows!: boolean;

    @Prop({ required: false, type: Object })
    selectedFrom?: Moment;

    @Prop({ required: false, type: Object })
    selectedTo?: Moment;

    @Prop({ required: false, type: Object })
    disabledBefore?: Moment;

    @Prop({ required: false, type: Object })
    disabledAfter?: Moment;

    @Prop({ required: false, type: Object })
    disabledFrom?: Moment;

    @Prop({ required: false, type: Object })
    disabledTo?: Moment;

    @Prop({ required: false, type: Boolean, default: true })
    monthBadgeVisibility!: boolean;

    @Emit('day-selected')
    emitDayClicked(day: Moment): Moment {
      return day;
    }

    @Emit('day-hovered')
    emitDayHovered(day: Moment): Moment {
      return day;
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
      return this.now.isSame(day, 'date');
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

    isDayDisabled(day: Moment): boolean {
      if (this.disabledBefore) {
        const isDisabled = this.disabledBefore.isAfter(day, 'date');
        if (isDisabled) {
          return true;
        }
      }

      if (this.disabledAfter) {
        const isDisabled = this.disabledAfter.isBefore(day, 'date');
        if (isDisabled) {
          return true;
        }
      }

      if (this.disabledFrom && this.disabledTo) {
        const isDisabled = day.isBetween(this.disabledFrom, this.disabledTo, 'date');
        if (isDisabled) {
          return true;
        }
      }

      return false;
    }

    gridItemClasses(day: Moment) {
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

    get firstMonthDay() {
      return moment({
        year: this.year,
        month: this.month,
      }).startOf('month');
    }

    get lastMonthDay() {
      return moment({
        year: this.year,
        month: this.month,
      }).endOf('month');
    }

    get days(): Moment[] {
      const days: Moment[] = [];

      let firstGridWeek = this.firstMonthDay.get('week');
      const lastGridWeek = this.lastMonthDay.get('week');

      const weeksInMonth = lastGridWeek - firstGridWeek + 1;
      let weeksInGrid = weeksInMonth;

      if (!this.removeNeedlessRows) {
        weeksInGrid = 6;
        if (this.spacePriority === SpacePriority.TOP) {
          firstGridWeek -= weeksInGrid - weeksInMonth;
        }
      }

      const weekStart = moment().week(firstGridWeek).startOf('week').startOf('day');

      for (let i = 0; i < weeksInGrid * 7; i++) {
        days.push(
          weekStart.clone().add('days', i),
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

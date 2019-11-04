import moment, { Moment } from 'moment';
import {
  Component,
  Emit,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';

import StDatepickerMonthGrid from '../datepicker-month-grid/index.vue';
import { SpacePriority } from '../datepicker-month-grid/types';
import StDatepickerMonthSelect from '../datepicker-month-select/index.vue';
import StDatepickerNavigationSlider from '../datepicker-navigation-slider/index.vue';
import StDatepickerYearSelect from '../datepicker-year-select/index.vue';
import { DisabledRange } from '../types';
import { DatepickerUtils } from '../utils';
import { SelectedFromTo } from './types';


@Component({
  components: {
    StDatepickerYearSelect,
    StDatepickerMonthSelect,
    StDatepickerMonthGrid,
    StDatepickerNavigationSlider,
  },
})
export default class StDatepickerPanel extends Vue {
  @Prop({ type: String, required: true })
  now!: string;

  @Prop({ type: [String, Array], required: true })
  value!: string | string[];

  @Prop(String)
  disabledTo?: string;

  @Prop(String)
  disabledFrom?: string;

  @Prop(Array)
  disabledRanges?: DisabledRange[];

  @Prop({ type: Number, default: 0 })
  valueMonthOffset!: number;

  @Prop({ type: Boolean, default: false })
  removeNeedlessRows!: boolean;

  @Prop({ type: Boolean, required: true })
  monthBadgeVisible!: boolean;

  @Prop({ type: Boolean, required: true })
  extendedNavigation!: boolean;

  @Prop({ type: String, default: SpacePriority.BOTTOM })
  spacePriority!: SpacePriority;

  @Emit('day-selected')
  emitDaySelected(day: string) {
    return day;
  }

  @Emit('day-hovered')
  emitDayHovered(day: string) {
    return day;
  }

  @Watch('startDate', { immediate: true })
  onStartDateChanged() {
    this.offsetDate = this.startDate.format();
  }

  @Watch('offsetDate')
  onOffsetDateChanged() {
    if (this.isYearSelect) {
      this.isYearSelect = false;
      return;
    }

    this.isMonthSelect = false;
  }

  @Watch('valueMonthOffset')
  onValueMonthOffsetChanged() {
    this.$nextTick(() => {
      this.offsetDate = this.startDateWithoutOffset.format();
    });
  }

  offsetDate: string = '';

  isYearSelect: boolean = false;

  isMonthSelect: boolean = false;

  get startDate(): Moment {
    const start = this.startDateWithoutOffset
      .clone();

    if (DatepickerUtils.isDateValid(this.offsetDate)) {
      const offsetDate = moment(this.offsetDate);

      start.year(offsetDate.year())
        .month(offsetDate.month());
    }

    return start;
  }

  get startDateWithoutOffset(): Moment {
    const now = this.nowMoment.clone().add(this.valueMonthOffset, 'month');

    if (!this.value) {
      return now;
    }

    if (Array.isArray(this.value) && this.value[0]) {
      const date = moment(this.value[0]);

      return date.isValid()
        ? date.add(this.valueMonthOffset, 'month')
        : now;
    }

    const date = moment(this.value);
    return date.isValid()
      ? date.add(this.valueMonthOffset, 'month')
      : now;
  }

  get panelMonth(): number {
    return this.startDate.month();
  }

  get panelYear(): number {
    return this.startDate.year();
  }

  get selectedFromTo(): SelectedFromTo {
    if (!Array.isArray(this.value)) {
      return {
        from: this.value,
        to: this.value,
      };
    }

    return {
      from: this.value[0],
      to: this.value[1],
    };
  }

  get nowMoment(): Moment {
    return moment(this.now);
  }

  get yearNavigationLabel(): string {
    return this.startDate.format('YYYY');
  }

  get monthNavigationLabel(): string {
    return this.startDate.format('MMMM');
  }

  onDaySelected(date: Moment) {
    this.emitDaySelected(date.format());
  }

  addYearOffset(offset: number) {
    this.offsetDate = moment(this.offsetDate).add(offset, 'year').format();
  }

  addMonthOffset(offset: number) {
    this.offsetDate = moment(this.offsetDate).add(offset, 'month').format();
  }

  onYearLabelClicked() {
    this.isYearSelect = true;
    this.isMonthSelect = true;
  }

  onMonthLabelClicked() {
    this.isMonthSelect = true;
  }
}

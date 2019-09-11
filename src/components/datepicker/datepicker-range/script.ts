import moment, { Moment } from 'moment';
import {
  Component,
  Emit,
  Prop,
  Vue,
} from 'vue-property-decorator';

import StIcon from '../../icon/index.vue';
import StDatepickerMonthGrid from '../datepicker-month-grid/index.vue';
import { SpacePriority } from '../datepicker-month-grid/types';
import StDatepickerTopNavigation from '../datepicker-top-navigation/index.vue';

interface TempSelection {
  date1?: Moment,
  date2?: Moment,
}

interface PanelConfig {
  month: number;
  year: number;
}

@Component({
  name: 'StDatepickerRange',
  components: {
    StDatepickerTopNavigation,
    StDatepickerMonthGrid,
    StIcon,
  },
})
export default class StDatepickerRange extends Vue {
    @Prop({ required: false, type: Number, default: () => moment().year() })
  yearRangeStart!: number;

    @Prop({ required: false, type: Number, default: () => moment().month() - 4 })
    monthRangeStart!: number;

    @Prop({ required: false, type: Number })
    monthVisible?: number;

    @Prop({ required: false, type: String, default: () => moment().format() })
    now!: string;

    @Prop({ required: false, type: [Array] })
    value?: string[];

    @Prop(String)
    disabledFrom?: string;

    @Prop(String)
    disabledTo?: string;

    @Prop(String)
    disabledBefore?: string;

    @Prop(String)
    disabledAfter?: string;

    @Emit('input')
    emitRangeInput(from?: string, to?: string) {
      if (!from) {
        return void 0;
      }

      return [from, to];
    }

    tempSelection: TempSelection = {
      date1: void 0,
      date2: void 0,
    };

    monthOffset: number = 0;

    resetValue() {
      this.emitRangeInput();
    }

    onDayHovered(day: Moment): void {
      if (!this.tempSelection.date1) {
        return;
      }

      this.tempSelection.date2 = day;
    }

    onDaySelected(day: Moment): void {
      if (this.value && moment(this.value[0]).isValid() && moment(this.value[1]).isValid()) {
        this.resetValue();
      }

      const { date1 } = this.tempSelection;

      if (!date1) {
        this.tempSelection.date1 = day;
        this.tempSelection.date2 = day;
        return;
      }

      this.emitRangeInput(
        date1.isBefore(day) ? date1.format() : day.format(),
        date1.isBefore(day) ? day.format() : date1.format(),
      );

      this.tempSelection.date1 = void 0;
      this.tempSelection.date2 = void 0;
    }

    getPanelSpacePriority(panelIndex: number) {
      if (panelIndex + 1 === this.panelsCount) {
        return SpacePriority.BOTTOM;
      }

      if (panelIndex === 0) {
        return SpacePriority.TOP;
      }

      return SpacePriority.BOTTOM;
    }

    stringToMomentOrUndef(date: string) {
      return date ? moment(date) : void 0;
    }

    get selectedFrom() {
      if (this.value && moment(this.value[0]).isValid() && moment(this.value[1]).isValid()) {
        return moment(this.value[0]);
      }

      const { date1, date2 } = this.tempSelection;

      if (!date1 || !date2) {
        return void 0;
      }

      return date1.isBefore(date2, 'date') ? date1 : date2;
    }

    get selectedTo() {
      if (this.value && moment(this.value[0]).isValid() && moment(this.value[1]).isValid()) {
        return moment(this.value[1]);
      }

      const { date1, date2 } = this.tempSelection;

      if (!date1 || !date2) {
        return void 0;
      }

      return date1.isAfter(date2, 'date') ? date1 : date2;
    }

    get panelsCount() {
      return this.monthVisible || 2;
    }

    get panelsConfig(): PanelConfig[] {
      const panels: PanelConfig[] = [];
      const rangeStartMonth = moment({
        year: this.yearRangeStart,
        month: this.monthRangeStart,
      });
      rangeStartMonth.add(this.monthOffset, 'month');

      for (let i = 0; i < this.panelsCount; i++) {
        const panelMonth = rangeStartMonth.clone().add(i, 'month');

        panels.push({
          month: panelMonth.month(),
          year: panelMonth.year(),
        });
      }

      return panels;
    }

    get nowMoment() {
      return moment(this.now);
    }

    get isValueSelected() {
      return this.value && moment(this.value[0]).isValid() && moment(this.value[1]).isValid();
    }
}

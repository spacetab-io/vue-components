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

interface PanelConfig {
  month: number;
  year: number;
}

@Component({
  name: 'StDatepickerSingle',
  components: {
    StDatepickerTopNavigation,
    StDatepickerMonthGrid,
    StIcon,
  },
})
export default class StDatepickerSingle extends Vue {
    @Prop({ required: false, type: Number, default: () => moment().year() })
  yearRangeStart!: number;

    @Prop({ required: false, type: Number, default: () => moment().month() - 4 })
    monthRangeStart!: number;

    @Prop({ required: false, type: Number })
    monthVisible?: number;

    @Prop(String)
    disabledFrom?: string;

    @Prop(String)
    disabledTo?: string;

    @Prop(String)
    disabledBefore?: string;

    @Prop(String)
    disabledAfter?: string;

    @Prop({ required: false, type: String, default: () => moment().format() })
    now!: string;

    @Prop({ required: false, type: [String] })
    value?: string | string[];

    @Emit('input')
    emitInput(date?: string) {
      return date;
    }

    monthOffset: number = 0;

    onDaySelected(day: Moment): void {
      this.emitInput(day.format());
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

    get panelsCount() {
      return this.monthVisible || 1;
    }

    get panelsConfig(): PanelConfig[] {
      const panels: PanelConfig[] = [];
      const rangeStartMonth = this.startDate.clone();

      if (this.monthOffset < 0) {
        rangeStartMonth.subtract(this.monthOffset * -1, 'month');
      } else if (this.monthOffset > 0) {
        rangeStartMonth.add(this.monthOffset, 'month');
      }

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

    get startDate(): Moment {
      return moment({
        year: this.yearRangeStart,
        month: this.monthRangeStart,
      });
    }
}

import moment from 'moment';
import {
  Component,
  Emit,
  Prop,
  Vue,
} from 'vue-property-decorator';

import { SpacePriority } from '../datepicker-month-grid/types';
import StDatepickerNavigation from '../datepicker-navigation/index.vue';
import StDatepickerPanel from '../datepicker-panel/index.vue';
import { DisabledRange, NavigationType } from '../types';
import { DatepickerUtils } from '../utils';

interface TempSelection {
  date1?: string,
  date2?: string,
}

interface PanelConfig {
  offset: number;
}

@Component({
  name: 'StDatepickerRange',
  components: {
    StDatepickerNavigation,
    StDatepickerPanel,
  },
})
export default class StDatepickerRange extends Vue {
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

  @Prop(Array)
  disabledRanges?: DisabledRange[];

  @Prop({ type: String, required: true })
  navigationType!: NavigationType;

  @Emit('input')
  emitRangeInput(from?: string, to?: string): string[] {
    if (!from) {
      return [];
    }

    if (!to) {
      return [from];
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

  onDayHovered(day: string): void {
    if (!this.tempSelection.date1) {
      return;
    }

    this.tempSelection.date2 = day;
  }

  onDaySelected(day: string): void {
    const momentDate = moment(day);

    if (this.value && moment(this.value[0]).isValid() && moment(this.value[1]).isValid()) {
      this.resetValue();
    }

    const { date1 } = this.tempSelection;

    if (!date1) {
      this.tempSelection.date1 = momentDate.format();
      this.tempSelection.date2 = momentDate.format();
      return;
    }

    this.emitRangeInput(
      moment(date1).isBefore(momentDate) ? date1 : momentDate.format(),
      moment(date1).isBefore(momentDate) ? momentDate.format() : date1,
    );

    this.tempSelection.date1 = void 0;
    this.tempSelection.date2 = void 0;
  }

  getPanelSpacePriority(panelIndex: number): SpacePriority {
    if (panelIndex + 1 === this.panelsCount) {
      return SpacePriority.BOTTOM;
    }

    if (panelIndex === 0) {
      return SpacePriority.TOP;
    }

    return SpacePriority.BOTTOM;
  }

  get panelSelectedValue(): string[] {
    return [this.selectedFrom, this.selectedTo].filter(item => item !== '');
  }

  get selectedFrom(): string {
    if (this.value && DatepickerUtils.isDateValid(this.value[0]) && DatepickerUtils.isDateValid(this.value[1])) {
      return this.value[0];
    }

    const { date1, date2 } = this.tempSelection;

    if (!date1 || !date2) {
      return '';
    }

    return moment(date1).isBefore(date2, 'date')
      ? date1
      : date2;
  }

  get selectedTo(): string {
    if (this.value && DatepickerUtils.isDateValid(this.value[0]) && DatepickerUtils.isDateValid(this.value[1])) {
      return this.value[1];
    }

    const { date1, date2 } = this.tempSelection;

    if (!date1 || !date2) {
      return '';
    }

    return moment(date1).isAfter(date2, 'date')
      ? date1
      : date2;
  }

  get panelsCount() {
    return this.monthVisible || 2;
  }

  get panelsConfig(): PanelConfig[] {
    const panels: PanelConfig[] = [];

    for (let i = 0; i < this.panelsCount; i++) {
      panels.push({
        offset: this.monthOffset + i,
      });
    }

    return panels;
  }

  get hasNavigation(): boolean {
    return this.navigationType !== NavigationType.none;
  }

  get isExtendedNavigation(): boolean {
    return this.hasNavigation && this.navigationType === NavigationType.extended;
  }

  get isSimpleNavigation(): boolean {
    return this.hasNavigation && this.navigationType === NavigationType.simple;
  }
}

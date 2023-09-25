import moment, { Moment } from 'moment';
import {
  Component,
  Emit,
  Prop,
  toNative,
  Vue,
} from 'vue-facing-decorator';

import { SpacePriority } from '../datepicker-month-grid/types';
import StDatepickerTopNavigation from '../datepicker-navigation/index.vue';
import StDatepickerPanel from '../datepicker-panel/index.vue';
import { DisabledRange, NavigationType } from '../types';

interface PanelConfig {
  offset: number;
}


@Component({
  name: 'StDatepickerSingle',
  components: {
    StDatepickerTopNavigation,
    StDatepickerPanel,
  },
})
class StDatepickerSingle extends Vue {
  @Prop({ required: false, type: Number })
  monthVisible?: number;

  @Prop({ type: String })
  disabledFrom?: string;

  @Prop({ type: String })
  disabledTo?: string;

  @Prop({ type: Array })
  disabledRanges?: DisabledRange[];

  @Prop({ required: false, type: String, default: () => moment().format() })
  now!: string;

  @Prop({ required: false, type: [String] })
  value?: string | string[];

  @Prop({ type: String, required: true })
  navigationType!: NavigationType;

  @Emit('input')
  emitInput(date?: string) {
    return date;
  }

  monthOffset: number = 0;

  onDaySelected(day: Moment): void {
    this.emitInput(day.format());
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

  get panelsCount(): number {
    return this.monthVisible || 1;
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
export default toNative(StDatepickerSingle);
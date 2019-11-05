import moment, { Moment } from 'moment';
import {
  Component,
  Emit,
  Prop,
  Vue,
} from 'vue-property-decorator';

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
export default class StDatepickerSingle extends Vue {
  @Prop({ required: false, type: Number })
  monthVisible?: number;

  @Prop(String)
  disabledFrom?: string;

  @Prop(String)
  disabledTo?: string;

  @Prop(Array)
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

  getPanelSpacePriority(panelIndex: number) {
    if (panelIndex + 1 === this.panelsCount) {
      return SpacePriority.BOTTOM;
    }

    if (panelIndex === 0) {
      return SpacePriority.TOP;
    }

    return SpacePriority.BOTTOM;
  }

  get panelsCount() {
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

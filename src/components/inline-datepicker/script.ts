import moment from 'moment';
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';

import StDatepickerRange from './datepicker-range/index.vue';
import StDatepickerSingle from './datepicker-single/index.vue';
import { DisabledRange, NavigationType } from './types';

@Component({
  name: 'StDatepicker',
  components: {
    StDatepickerSingle,
    StDatepickerRange,
  },
})
export default class StDatepicker extends Vue {
  @Prop({ required: false, type: Number, default: () => moment().year() })
  yearRangeStart!: number;

  @Prop({ required: false, type: Number, default: () => moment().month() - 1 })
  monthRangeStart!: number;

  @Prop({ required: false, type: Boolean, default: true })
  isRange!: boolean;

  @Prop({ required: false, type: Number })
  monthVisible?: number;

  @Prop({ required: false, type: String, default: () => moment().format() })
  now!: string;

  @Prop({ required: false, type: [String, Array] })
  value?: string | string[];

  @Prop(String)
  disabledFrom?: string;

  @Prop(String)
  disabledTo?: string;

  @Prop(Array)
  disabledRanges?: DisabledRange[];

  @Prop({ type: String, default: NavigationType.EXTENDED })
  navigationType!: NavigationType;
}

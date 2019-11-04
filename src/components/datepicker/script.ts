import moment from 'moment';
import {
  Component,
  Emit,
  Prop,
  Vue,
} from 'vue-property-decorator';

import StInput from '../input/index.vue';
import StPopper from '../popper/index.vue';
import {
  PopperPlacement,
  TriggerType,
} from '../popper/types';
import StDatepickerRange from './datepicker-range/index.vue';
import StDatepickerSingle from './datepicker-single/index.vue';
import {
  DisabledRange,
  NavigationType,
} from './types';
import { DatepickerUtils } from './utils';

@Component({
  name: 'StDatepicker',
  components: {
    StDatepickerSingle,
    StDatepickerRange,
    StPopper,
    StInput,
  },
})
export default class StDatepicker extends Vue {
  @Prop({ type: Boolean, default: false })
  isRange!: boolean;

  @Prop({ type: Number })
  monthVisible?: number;

  @Prop({ type: String, default: () => moment().format() })
  now!: string;

  @Prop({ type: [String, Array], required: true })
  value!: string | string[];

  @Prop(String)
  disabledFrom?: string;

  @Prop(String)
  disabledTo?: string;

  @Prop(Array)
  disabledRanges?: DisabledRange[];

  @Prop({ type: String, default: NavigationType.extended })
  navigationType!: NavigationType;

  @Prop({ type: Boolean, default: false })
  inline!: boolean;

  @Prop({ type: String, default: 'DD.MM.YYYY' })
  inputFormat!: string;

  @Prop({ type: String, default: TriggerType.click })
  triggerType!: string;

  @Prop(String)
  inputClass?: string;

  @Prop(String)
  datepickerClass?: string;

  @Prop(Boolean)
  popperArrowVisible?: boolean;

  @Prop({ type: Boolean, default: true })
  clearable!: boolean;

  @Prop({ type: String })
  popperPlacement?: PopperPlacement;

  @Prop(String)
  popperClass?: string;

  @Emit('input')
  emitInput(val: string | string[]): string | string[] {
    return val;
  }

  $refs!: {
    input: Vue,
  };

  componentMounted: boolean = false;

  mounted() {
    this.componentMounted = true;
  }

  get isExtended(): boolean {
    return this.navigationType === NavigationType.extended;
  }

  get inputValue(): string {
    if (Array.isArray(this.value)) {
      if (this.value.length === 2 && this.value.every(item => DatepickerUtils.isDateValid(item))) {
        return `${moment(this.value[0]).format(this.inputFormat)} - ${moment(this.value[1]).format(this.inputFormat)}`;
      }
      return '';
    }

    if (!Array.isArray(this.value) && DatepickerUtils.isDateValid(this.value)) {
      return moment(this.value).format(this.inputFormat);
    }

    return '';
  }

  clear() {
    if (this.isRange) {
      this.emitInput([]);
      return;
    }

    this.emitInput('');
  }
}

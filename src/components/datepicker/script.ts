import moment from 'moment';
import {
  Component,
  Emit,
  Prop,
  toNative,
  Vue,
} from 'vue-facing-decorator';

import StInput from '../input/index.vue';
import StInputScript from '../input/script';
import StPopper from '../popper/index.vue';
import StPopperScript from '../popper/script';
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
import {
  DatepickerUtils,
} from './utils';


@Component({
  name: 'StDatepicker',
  components: {
    StDatepickerSingle,
    StDatepickerRange,
    StPopper,
    StInput,
  },
})
class StDatepicker extends Vue {
  @Prop({ type: Boolean, default: false })
  isRange!: boolean;

  @Prop({ type: Number })
  monthVisible?: number;

  @Prop({ type: String, default: () => moment().format() })
  now!: string;

  @Prop({ type: [String, Array], required: true })
  value!: string | string[];

  @Prop({ type: String })
  disabledFrom?: string;

  @Prop({ type: String })
  disabledTo?: string;

  @Prop({ type: Array })
  disabledRanges?: DisabledRange[];

  @Prop({ type: String, default: NavigationType.extended })
  navigationType!: NavigationType;

  @Prop({ type: Boolean, default: false })
  inline!: boolean;

  @Prop({ type: String, default: 'DD.MM.YYYY' })
  inputFormat!: string;

  @Prop({ type: String, default: TriggerType.focus })
  triggerType!: string;

  @Prop({ type: String })
  inputClass?: string;

  @Prop({ type: String })
  datepickerClass?: string;

  @Prop({ type: Boolean, default: false })
  popperArrowVisible?: boolean;

  @Prop({ type: Boolean, default: true })
  clearable!: boolean;

  @Prop({ type: String, default: PopperPlacement.auto })
  popperPlacement?: PopperPlacement;

  @Prop({ type: String })
  popperClass?: string;

  @Prop({ type: String })
  placeholder?: string;

  @Prop({ type: String })
  suffixIcon?: string;

  @Prop({ type: String })
  prefixIcon?: string;

  @Prop({ type: Boolean, default: false })
  closeOnPick!: boolean;

  @Emit('input')
  emitInput(val: string | string[]): string | string[] {
    return val;
  }

  $refs!: {
    input: StInputScript,
    popper: StPopperScript,
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

  handleValuePick(value: string | string[]) {
    this.emitInput(value);

    if (this.closeOnPick) {
      this.close();
    }
  }

  clear() {
    if (this.isRange) {
      this.emitInput([]);
      return;
    }

    this.emitInput('');
  }

  close() {
    this.$refs.popper.doClose();
  }

  blur() {
    if (this.$refs.input) {
      this.$refs.input.blur();
    }
  }

  focus() {
    if (this.$refs.input) {
      this.$refs.input.focus();
    }
  }

  open() {
    this.$refs.popper.doShow();
  }
}

export default toNative(StDatepicker);
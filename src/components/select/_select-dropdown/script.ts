import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';

import StPopper from '../../popper/index.vue';
import { SelectOption } from '../types';


@Component({
  name: 'StSelectDropdown',
  components: {
    StPopper,
  },
})
export default class StSelectDropdown extends Vue {
  @Prop(Array)
  options!: SelectOption[];

  @Prop({ type: Array, default: () => [] })
  selectedValues!: string[];

  @Prop({ type: Boolean, default: true })
  closeOnSelect!: boolean;

  @Prop(String)
  popperClass!: string;

  @Prop(String)
  optionClass!: string;

  @Prop(Boolean)
  disabled!: boolean;

  @Prop(Boolean)
  readonly!: boolean;

  get popperClassName(): string {
    return ['st-select-dropdown', this.popperClass].filter(Boolean).join(' ');
  }

  select(option: SelectOption) {
    if (this.readonly || option.disabled) { return; }
    this.$emit('select', option);
    if (this.closeOnSelect) {
      this.closePopper();
    }
  }

  closePopper() {
    (this.$refs.popper as any).doClose();
  }
}

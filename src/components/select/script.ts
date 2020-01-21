import {
  Component,
  Prop,
} from 'vue-property-decorator';

import StSelectMultiple from './_select-multiple/index.vue';
import StSelectMultipleScript from './_select-multiple/script';
import StSelectSingle from './_select-single/index.vue';
import StSelectSingleScript from './_select-single/script';
import StSelectBase from './_select.base';
import { BaseSelectValue } from './types';


@Component({
  name: 'StSelect',
  components: {
    StSelectSingle,
    StSelectMultiple,
  },
})
export default class StSelect extends StSelectBase {
  @Prop()
  value!: BaseSelectValue;

  get componentName(): string {
    return `st-select-${this.multiple ? 'multiple' : 'single'}`;
  }

  openDropdown(): void {
    const $selectRef = this.multiple
      ? (this.$refs['select-component'] as StSelectMultipleScript)
      : (this.$refs['select-component'] as StSelectSingleScript);

    $selectRef.openDropdown();
  }

  closeDropdown(): void {
    const $selectRef = this.multiple
      ? (this.$refs['select-component'] as StSelectMultipleScript)
      : (this.$refs['select-component'] as StSelectSingleScript);

    $selectRef.closeDropdown();
  }
}

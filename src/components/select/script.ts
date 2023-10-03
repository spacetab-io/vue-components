import {
  Component,
  Prop,
  Setup,
  toNative,
} from 'vue-facing-decorator';

import StSelectMultiple from './_select-multiple/index.vue';
import StSelectMultipleScript from './_select-multiple/script';
import StSelectSingle from './_select-single/index.vue';
import StSelectSingleScript from './_select-single/script';
import StSelectBase from './_select.base';
import { BaseSelectValue } from './types';
import { ref } from 'vue';


@Component({
  name: 'StSelect',
  components: {
    StSelectSingle,
    StSelectMultiple,
  },
})
class StSelect extends StSelectBase {
  @Setup(() => ref('select-component'))
  selectComponent!: StSelectMultipleScript | StSelectSingleScript;

  @Prop({ type: [String, Array] })
  value!: BaseSelectValue;

  get componentName(): string {
    return this.multiple ? 'st-select-multiple' : 'st-select-single';
  }

  openDropdown(): void {
    this.selectComponent.openDropdown();
  }

  closeDropdown(): void {
    this.selectComponent.closeDropdown();
  }

  clear(): void {
    this.selectComponent.clear();
  }
}

export default toNative(StSelectBase);
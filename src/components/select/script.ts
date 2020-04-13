import {
  Component,
  Prop,
  Ref,
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
  @Ref('select-component')
  selectComponent!: StSelectMultipleScript | StSelectSingleScript;

  @Prop()
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

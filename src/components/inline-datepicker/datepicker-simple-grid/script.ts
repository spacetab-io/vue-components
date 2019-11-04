import {
  Component,
  Emit,
  Prop,
  Vue,
} from 'vue-property-decorator';

import { DatepickerUtils } from '../utils';
import { SimpleGridItem } from './types';

@Component
export default class StDatepickerSimpleGrid extends Vue {
  @Prop({ required: true })
  value!: number;

  @Emit('input')
  emitInput(item: SimpleGridItem) {
    return item.value;
  }

  @Prop({ type: Array, required: true })
  items!: SimpleGridItem[];

  @Prop({ type: Number, default: 4 })
  itemsPerRow!: number;

  get groupedItems(): SimpleGridItem[][] {
    return DatepickerUtils.chunk(this.items, this.itemsPerRow);
  }

  itemClasses(item: SimpleGridItem): { [key: string]: boolean } {
    return {
      'st-datepicker-simple-grid__item--selected': item.value === this.value,
      'st-datepicker-simple-grid__item--disabled': !!item.disabled,
    };
  }
}

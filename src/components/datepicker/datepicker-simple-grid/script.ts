import {
  Component,
  Emit,
  Prop,
  Vue,
} from 'vue-property-decorator';

import { SimpleClassList } from '../../../types/general';
import { DatepickerUtils } from '../utils';
import { SimpleGridItem } from './types';


@Component({
  name: 'StDatepickerSimpleGrid',
})
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

  itemClasses(item: SimpleGridItem): SimpleClassList {
    return {
      'st-datepicker-simple-grid__item--selected': item.value === this.value,
      'st-datepicker-simple-grid__item--disabled': !!item.disabled,
    };
  }

  onItemClick(event: MouseEvent, item: SimpleGridItem) {
    event.stopPropagation();
    event.preventDefault();

    this.emitInput(item);
  }
}

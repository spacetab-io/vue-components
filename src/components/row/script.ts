import {
  Component,
  Prop,
  toNative,
  Vue,
} from 'vue-facing-decorator';

interface StyleMargins {
  marginLeft?: string;
  marginRight?: string;
}


@Component({
  name: 'StRow',
})
class StRow extends Vue {
  @Prop({ type: String, default: 'div' })
  tag!: string;

  @Prop({ type: Number})
  gutter!: number;

  @Prop({ type: String})
  type!: string;

  @Prop({ type: String, default: 'start' })
  justify!: string;

  @Prop({ type: String, default: 'top' })
  align!: string;

  get style() {
    const style: StyleMargins = {};
    if (this.gutter) {
      style.marginLeft = `-${this.gutter / 2}px`;
      style.marginRight = style.marginLeft;
    }
    return style;
  }

  get classList() {
    return [
      'st-row',
      this.justify !== 'start' ? `st-row--justify-${this.justify}` : '',
      this.align !== 'top' ? `st-row--align-${this.align}` : '',
      this.type === 'flex' ? 'st-row--flex' : '',
    ].filter(Boolean);
  }
}

export default toNative(StRow);
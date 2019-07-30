import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';

interface StyleMargins {
  marginLeft?: string;
  marginRight?: string;
}

@Component
export default class StRow extends Vue {
  @Prop({ type: String, default: 'div' })
  tag!: string;

  @Prop(Number)
  gutter!: number;

  @Prop(String)
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

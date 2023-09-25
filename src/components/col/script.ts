import {
  Component,
  Prop,
  toNative,
  Vue,
} from 'vue-facing-decorator';

import StRow from '../row/script';

interface StylePaddings {
  paddingLeft?: string;
  paddingRight?: string;
}

interface SizeObject {
  [key: string]: number | object;
}

interface PropObject {
  [key: string]: number;
}


@Component({
  name: 'StCol',
})
class StCol extends Vue {
  @Prop({ type: String, default: 'div' })
  tag!: string;

  @Prop({ type: Number, default: 24 })
  span!: number;

  @Prop({ type: Number })
  offset!: number;

  @Prop({ type: Number })
  pull!: number;

  @Prop({ type: Number })
  push!: number;

  @Prop({ type: [Number, Object] })
  xs!: number|object;

  @Prop({ type: [Number, Object] })
  sm!: number|object;

  @Prop({ type: [Number, Object] })
  md!: number|object;

  @Prop({ type: [Number, Object] })
  lg!: number|object;

  @Prop({ type: [Number, Object] })
  xl!: number|object;

  get gutter(): number {
    let { $parent } = this;
    /* eslint no-underscore-dangle: 0 */
    while ($parent && $parent.$el && $parent.$el.classList.contains('st-row')) {
      /* eslint prefer-destructuring: 0 */
      $parent = $parent.$parent;
    }
    return $parent ? ($parent as unknown as StRow).gutter : 0;
  }

  get style(): StylePaddings {
    const style: StylePaddings = {};
    if (this.gutter) {
      style.paddingLeft = `${this.gutter / 2}px`;
      style.paddingRight = style.paddingLeft;
    }
    return style;
  }

  get sizeClassList(): string[] {
    const classList: string[] = [];
    const sizeObject: SizeObject = {
      xs: this.xs,
      sm: this.sm,
      md: this.md,
      lg: this.lg,
      xl: this.xl,
    };
    Object.keys(sizeObject).forEach((sizeName: string) => {
      const sizeValue: number | any = sizeObject[sizeName];
      if (typeof sizeValue === 'number') {
        classList.push(`st-col-${sizeName}-${sizeValue}`);
      } else if (typeof sizeValue === 'object') {
        Object.keys(sizeValue).forEach((sizePropName: string) => {
          const sizePropValue = sizeValue[sizePropName];
          classList.push(
            sizePropName !== 'span'
              ? `st-col-${sizeName}-${sizePropName}-${sizePropValue}`
              : `st-col-${sizeName}-${sizePropValue}`,
          );
        });
      }
    });
    return classList;
  }

  get propClassList(): string[] {
    const classList: string[] = [];
    const propObject: PropObject = {
      span: this.span,
      offset: this.offset,
      pull: this.pull,
      push: this.push,
    };
    Object.keys(propObject).forEach((propName: string) => {
      const propValue = propObject[propName];
      if (propValue || propValue === 0) {
        classList.push(
          propName !== 'span'
            ? `st-col-${propName}-${propValue}`
            : `st-col-${propValue}`,
        );
      }
    });
    return classList;
  }

  get classList(): string[] {
    return [
      'st-col',
      ...this.propClassList,
      ...this.sizeClassList,
    ].filter(Boolean);
  }
}

export default toNative(StCol);
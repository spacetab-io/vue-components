import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';


const defaultClassName = 'st-tabs__item';

@Component({
  name: 'StTabItem',
})
export default class StTabItem extends Vue {
  @Prop(String)
  className!: string;

  @Prop(String)
  icon!: string;

  @Prop(String)
  label!: string;

  @Prop(Boolean)
  closeable!: boolean;

  @Prop(Boolean)
  selected!: boolean;

  get componentClassName(): string[] {
    const value = [defaultClassName];
    if (this.className) {
      value.push(this.className);
    }
    return value.reduce((acc: string[], item: string) => {
      acc.push(item);
      if (this.selected) {
        acc.push(`${item}--selected`);
      }
      return acc;
    }, []);
  }
}

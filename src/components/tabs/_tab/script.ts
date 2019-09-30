import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';


@Component({
  name: 'StTabItem',
})
export default class StTabItem extends Vue {
  @Prop(String)
  icon!: string;

  @Prop(String)
  label!: string;

  @Prop(Boolean)
  closeable!: boolean;

  @Prop(Boolean)
  selected!: boolean;
}

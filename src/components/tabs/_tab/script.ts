import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';


@Component({
  name: 'StTab',
})
export default class StTab extends Vue {
  @Prop(String)
  icon!: string;

  @Prop(String)
  label!: string;

  @Prop(Boolean)
  closeable!: boolean;
}

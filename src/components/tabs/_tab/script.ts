import {
  Component,
  Prop,
  toNative,
  Vue,
} from 'vue-facing-decorator';


@Component({
  name: 'StTab',
})
class StTab extends Vue {
  @Prop({ type: String})
  icon!: string;

  @Prop({ type: String})
  label!: string;

  @Prop({ type: Boolean})
  closeable!: boolean;
}

export default toNative(StTab);
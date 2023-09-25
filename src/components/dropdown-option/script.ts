import {
  Component,
  Prop,
  toNative,
  Vue,
} from 'vue-facing-decorator';


@Component({
  name: 'StDropdownOption',
})
class StDropdownOption extends Vue {
  @Prop({ type: Boolean})
  readonly!: boolean;

  @Prop({ type: Boolean})
  disabled!: boolean;
}

export default toNative(StDropdownOption);
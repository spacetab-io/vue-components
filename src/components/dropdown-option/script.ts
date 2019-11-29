import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';


@Component({
  name: 'StDropdownOption',
})
export default class StDropdownOption extends Vue {
  @Prop(Boolean)
  readonly!: boolean;

  @Prop(Boolean)
  disabled!: boolean;
}

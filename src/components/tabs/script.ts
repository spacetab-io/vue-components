import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';


interface Tab {
  label: string;
  icon?: string;
  closeable?: boolean;
  active?: boolean;
}

@Component({
  name: 'StTabs',
})
export default class StTabs extends Vue {
  @Prop(Array)
  tabs!: Tab[];
}

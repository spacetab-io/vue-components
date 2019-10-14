import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';

import StTabItem from './_tab/index.vue';
import { Tab } from './types';


@Component({
  name: 'StTabs',
  components: {
    StTabItem,
  },
})
export default class StTabs extends Vue {
  @Prop(Array)
  tabs!: Tab[];

  @Prop(String)
  value!: string;

  copiedTabs: Tab[] = [];

  selectedTabId: string = '';

  @Watch('tabs')
  onTabsChange() {
    this.setCopiedTabs();
  }

  @Watch('value')
  onValueChange(value: string) {
    this.selectedTabId = value;
  }

  mounted() {
    this.setCopiedTabs();
    this.setSelectedTab();
  }

  setCopiedTabs() {
    this.copiedTabs = this.tabs;
  }

  setSelectedTab() {
    if (this.value) {
      this.selectedTabId = this.value;
    } else {
      this.select(this.copiedTabs[0]);
    }
  }

  select(tab: Tab) {
    this.selectedTabId = tab.id;
    this.$emit('select', tab);
    this.$emit('input', this.selectedTabId);
  }

  close(closedTab: Tab) {
    this.copiedTabs = this.copiedTabs.filter((tab: Tab) => tab.id !== closedTab.id);
    this.$emit('close', closedTab);
  }
}

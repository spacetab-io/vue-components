import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';

import { Tab } from './types';


@Component({
  name: 'StTabs',
})
export default class StTabs extends Vue {
  @Prop(Array)
  tabs!: Tab[];

  @Prop(String)
  defaultSelectedTabId!: string;

  copiedTabs: Tab[] = [];

  selectedTabId: string = '';

  @Watch('tabs')
  onTabsChange() {
    this.setCopiedTabs();
  }

  @Watch('defaultSelectedTabId')
  onActiveIdChange() {
    this.setSelectedTab();
  }

  mounted() {
    this.setSelectedTab();
    this.setCopiedTabs();
  }

  setCopiedTabs() {
    this.copiedTabs = this.tabs;
  }

  setSelectedTab() {
    const tabsList = this.copiedTabs.length
      ? this.copiedTabs
      : this.tabs;
    this.selectedTabId = this.defaultSelectedTabId
      ? this.defaultSelectedTabId
      : tabsList[0].id;
  }

  select(tab: Tab) {
    this.selectedTabId = tab.id;
    this.$emit('select', tab);
  }

  close(closedTab: Tab) {
    this.copiedTabs = this.copiedTabs.filter((tab: Tab) => tab.id !== closedTab.id);
    this.$emit('close', closedTab);
  }
}

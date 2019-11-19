import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';

import { PopperBindProperties } from '../popper/types';
import StTabsListCollapsed from './_list-collapsed/index.vue';
import StTabsListDefault from './_list-default/index.vue';
import { Tab } from './types';


@Component({
  name: 'StTabs',
  components: {
    StTabsListDefault,
    StTabsListCollapsed,
  },
})
export default class StTabs extends Vue {
  @Prop(Array)
  tabs!: Tab[];

  @Prop(String)
  value!: string;

  @Prop(Boolean)
  collapsed!: boolean;

  @Prop({ type: Object, default: () => {} })
  collapserPopperProps!: PopperBindProperties;

  copiedTabs: Tab[] = [];

  selectedTabId: string = '';

  get innerComponentName(): string {
    return `st-tabs-list-${this.collapsed ? 'collapsed' : 'default'}`;
  }

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

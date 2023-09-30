import { storiesOf } from '@storybook/vue3'
import { boolean, number, select } from '@storybook/addon-knobs';
import { template } from '../../templates/tabs/default.template';
import documentation from '../../documentation/tabs.md'
import { iconsList } from '../../utils/props-options';

storiesOf('Components|Tabs', module).add('Default', () => ({
  template,
  props: {
    collapsed: {
      default: boolean('Collapsed', false),
    },
    icon: {
      default: select('Icon (each item)', iconsList, iconsList[0]),
    },
    closeable: {
      default: boolean('Closeable (each item)', true),
    },
    disabled: {
      default: boolean('Disabled (each item)', false),
    },
    tabsAmount: {
      default: number('*for test* Tabs amount', 5),
    }
  },
  data() {
    return {
      selectedTabId: '',
    }
  },
  computed: {
    tabs() {
      return new Array(this.tabsAmount)
        .fill({})
        .map((item, index) => ({
          id: `tab-${index + 1}`,
          label: `Tab ${index + 1}`,
          closeable: this.closeable,
          disabled: this.disabled,
          icon: this.icon,
        }));
    },
  },
  mounted() {
    this.selectedTabId = this.tabs[0].id;
  },
  methods: {
    getTabById(id) {
      return this.tabs.find(item => item.id === id);
    },
  }
}), {
  notes: { markdown: documentation },
});

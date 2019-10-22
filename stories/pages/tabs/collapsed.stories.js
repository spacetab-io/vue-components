import { storiesOf } from '@storybook/vue'
import { boolean, text, array, select } from '@storybook/addon-knobs';
import { template } from '../../templates/tabs/collapsed.template';
import documentation from '../../documentation/tabs-collapsed.md'
import { iconsList } from '../../utils/props-options';

storiesOf('Components|Tabs', module).add('Collapsed', () => ({
  template,
  props: {
    icon: {
      default: select('Icon (each item)', iconsList, iconsList[0]),
    },
    closeable: {
      default: boolean('Closeable (each item)', true),
    },
  },
  data() {
    return {
      selectedTabId: 'tab-1',
      tabsData: [
        {
          id: 'tab-1',
          label: 'Tab 1',
        },
        {
          id: 'tab-2',
          label: 'Tab 2',
        },
        {
          id: 'tab-3',
          label: 'Tab 3',
        },
        {
          id: 'tab-4',
          label: 'Tab 4',
        },
        {
          id: 'tab-5',
          label: 'Tab 5',
        },
      ]
    }
  },
  computed: {
    tabs() {
      return this.tabsData.map(item => ({
        id: item.id,
        label: item.label,
        closeable: this.closeable,
        icon: this.icon,
      }));
    },
  },
  methods: {
    getTabById(id) {
      return this.tabs.find(item => item.id === id);
    },
  }
}), {
  notes: { markdown: documentation },
});

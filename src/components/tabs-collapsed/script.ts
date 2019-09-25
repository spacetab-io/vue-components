import {
  Component,
  Prop,
} from 'vue-property-decorator';

import { PopperBindProperties } from '../popper/types';
import StTabs from '../tabs/script';
import { Tab } from '../tabs/types';


@Component({
  name: 'StTabsCollapsed',
})
export default class StTabsCollapsed extends StTabs {
  @Prop({ type: Object, default: () => {} })
  popperProps!: PopperBindProperties;

  elementClassName(element: Tab) {
    return [
      'st-tabs__item',
      {
        'st-tabs__item--selected': this.selectedTabId === element.id,
      },
    ];
  }

  hiddenElementClassName(element: Tab) {
    return [
      'st-tabs__hidden-item',
      {
        'st-tabs__hidden-item--selected': this.selectedTabId === element.id,
      },
    ];
  }
}

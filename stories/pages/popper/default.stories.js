import { storiesOf } from '@storybook/vue'
import {number, boolean, text, array, select, button} from '@storybook/addon-knobs';
import { template } from '../../templates/popper/default.template';
import documentation from '../../documentation/popper.md'
import {PopperPlacement, TriggerType} from "../../../src/components/popper/types";

let notes = documentation;
notes = notes.replace('{{DEFAULT_PLACEMENT}}', PopperPlacement.Auto);
notes = notes.replace('{{AVAILABLE_PLACEMENTS}}', Object.values(PopperPlacement).join(' , '));

notes = notes.replace('{{DEFAULT_TRIGGER}}', TriggerType.Hover);
notes = notes.replace('{{AVAILABLE_TRIGGERS}}', Object.values(TriggerType).join(' , '));

storiesOf('Components|Popper', module).add('Default', () => ({
  template,
  props: {
    delayOnMouseOver: {
      default: number('Delay on mouse over', 100),
    },
    delayOnMouseOut: {
      default: number('Delay on mouse out', 100),
    },
    placement: {
      default: select('Placement', [
        'auto-start',
        'auto',
        'auto-end',
        'top-start',
        'top',
        'top-end',
        'right-start',
        'right',
        'right-end',
        'bottom-end',
        'bottom',
        'bottom-start',
        'left-end',
        'left',
        'left-start',
      ], 'bottom')
    },
    trigger: {
      default: select('Trigger', [
        'click',
        'hover',
        'focus',
      ], 'click')
    },
    arrowVisible: {
      default: boolean('Arrow visible', true)
    },
    withBorder: {
      default: boolean('With border', false)
    },
  },
  data() {
    return {
      key: 0,
    }
  },
  watch: {
    trigger() {
      this.refresh();
    },
    arrowVisible() {
      this.refresh();
    },
  },
  methods: {
    refresh() {
      this.key += 1;
    },
  },
}), {
  notes: { markdown: notes },
});

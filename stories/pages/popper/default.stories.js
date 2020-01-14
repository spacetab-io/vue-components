import { storiesOf } from '@storybook/vue'
import { number, boolean, select } from '@storybook/addon-knobs';
import { template } from '../../templates/popper/default.template';
import documentation from '../../documentation/popper.md'
import { PopperPlacement, TriggerType } from "../../../src/components/popper/types";

let notes = documentation;
notes = notes.replace('{{DEFAULT_PLACEMENT}}', PopperPlacement.auto);
notes = notes.replace('{{AVAILABLE_PLACEMENTS}}', Object.values(PopperPlacement).join(', '));

notes = notes.replace('{{DEFAULT_TRIGGER}}', TriggerType.hover);
notes = notes.replace('{{AVAILABLE_TRIGGERS}}', Object.values(TriggerType).join(', '));

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
      default: select('Placement', Object.values(PopperPlacement), PopperPlacement.auto)
    },
    trigger: {
      default: select('Trigger', Object.values(TriggerType), TriggerType.click)
    },
    arrowVisible: {
      default: boolean('Arrow visible', true)
    },
    withBorder: {
      default: boolean('With border', false)
    },
    width: {
      default: number('Width', 0)
    },
    value: {
      default: boolean('manual value', false),
    },
    disabled: {
      default: boolean('Disabled', false),
    },
    forceShow: {
      default: boolean('Force show', false),
    },
    appendToBody: {
      default: boolean('Append to body', true),
    },
    useReferenceWidth: {
      default: boolean('Use reference width', false),
    }
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

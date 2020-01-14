import { storiesOf } from '@storybook/vue'
import { boolean, text, array, number, select } from '@storybook/addon-knobs';
import { template } from '../../templates/dropdown/default.template';
import documentation from '../../documentation/dropdown.md'
import { PopperPlacement, TriggerType } from '../../../src/components/popper/types';

let notes = documentation;
notes = notes.replace('{{DEFAULT_PLACEMENT}}', PopperPlacement.bottomStart);
notes = notes.replace('{{AVAILABLE_PLACEMENTS}}', Object.values(PopperPlacement).join(', '));

notes = notes.replace('{{DEFAULT_TRIGGER}}', TriggerType.click);
notes = notes.replace('{{AVAILABLE_TRIGGERS}}', Object.values(TriggerType).join(', '));

storiesOf('Components|Dropdown', module).add('Default', () => ({
  template,
  props: {
    placement: {
      default: select('placement', Object.values(PopperPlacement), PopperPlacement.bottomStart)
    },
    trigger: {
      default: select('trigger', Object.values(TriggerType), TriggerType.click)
    },
    arrowVisible: {
      default: boolean('arrow-visible', false)
    },
    withBorder: {
      default: boolean('with-border', true)
    },
    width: {
      default: number('width', 0)
    },
    value: {
      default: boolean('value (for manual trigger)', false),
    },
    disabled: {
      default: boolean('disabled', false),
    },
    forceShow: {
      default: boolean('force-show', false),
    },
    appendToBody: {
      default: boolean('append-to-body', true),
    },
    delayOnMouseOver: {
      default: number('delay-on-mouse-over', 100),
    },
    delayOnMouseOut: {
      default: number('delay-on-mouse-out', 100),
    },
    readonly: {
      default: boolean('*DROPDOWN-OPTIONS | readonly', false),
    },
    useReferenceWidth: {
      default: boolean('Use reference width', false),
    },
  },
  data() {
    return {}
  },
}), {
  notes: { markdown: notes },
});

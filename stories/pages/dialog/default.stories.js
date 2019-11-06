import { storiesOf } from '@storybook/vue'
import { boolean, select, text } from '@storybook/addon-knobs';
import { template } from '../../templates/dialog/default.template';
import documentation from '../../documentation/dialog.md'
import {iconsList} from "../../utils/props-options";
import {DialogPlacement} from "../../../src/components/dialog/types";

storiesOf('Components|Dialog', module).add('Default', () => ({
  template,
  props: {
    disableOverlayClose: {
      default: boolean('Disable close on overlay click', false),
    },
    disableEscapeClose: {
      default: boolean('Disabled close on escape button clicked', false),
    },
    width: {
      default: text('Custom dialog width', ''),
    },
    centerContent: {
      default: boolean('Is content should be centered?', false),
    },
    hideCloseIcon: {
      default: boolean('Hide close icon?', false),
    },
    closeIcon: {
      default: select('Close icon', iconsList, 'cross'),
    },
    placement: {
      default: select('Dialog placement', Object.values(DialogPlacement), 'default'),
    },
    pageLongContent: {
      default: boolean('Page Setting: Is page with long content?', false),
    },
    dialogLongContent: {
      default: boolean('Page Setting: Is dialog with long content?', false),
    },
  },
  data() {
    return {
      vModel: false,
      key: 0,
    }
  },
  watch: {
    disableOverlayClose() {
      this.key++;
    },
    disableEscapeClose() {
      this.key++;
    },
  }
}), {
  notes: { markdown: documentation },
});

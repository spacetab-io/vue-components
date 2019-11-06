import { storiesOf } from '@storybook/vue';
import { template } from '../../templates/tooltip/default.template';
import documentation from '../../documentation/tooltip.md';
import { text,  } from "@storybook/addon-knobs";

const decodeHTMLEntities = (text) => {
  [
    ['amp', '&'],
    ['apos', '\''],
    ['#x27', '\''],
    ['#x2F', '/'],
    ['#39', '\''],
    ['#47', '/'],
    ['lt', '<'],
    ['gt', '>'],
    ['nbsp', ' '],
    ['quot', '"']
  ].forEach(item => {
    text = text.replace(new RegExp('&'+item[0]+';', 'g'), item[1]);
  });

  return text;
};

storiesOf('Components|Tooltip', module).add('Default', () => ({
  template,
  props: {
    rawContent: {
      default: text('Raw content', 'Your raw content.'),
    },
    htmlContent: {
      default: text('Html content', '<strong>Your</strong> <i>HTML</i> <span>content</span>')
    },
  },
  data() {
    return {}
  },
  computed: {
    htmlDecoded() {
      return decodeHTMLEntities(this.htmlContent);
    }
  },
}), {
  notes: { markdown: documentation },
});

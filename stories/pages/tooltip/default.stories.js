import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue3';

import documentation from '../../documentation/tooltip.md';
import { template } from '../../templates/tooltip/default.template';

const decodeHTMLEntities = (baseText) => {
  let resultText = baseText;
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
    ['quot', '"'],
  ].forEach((item) => {
    resultText = resultText.replace(new RegExp(`&${item[0]};`, 'g'), item[1]);
  });

  return baseText;
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
    return {};
  },
  computed: {
    htmlDecoded() {
      return decodeHTMLEntities(this.htmlContent);
    },
  },
}), {
  notes: { markdown: documentation },
});

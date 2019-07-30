import { storiesOf } from '@storybook/vue'

import { boolean } from '@storybook/addon-knobs';

const template = `
<div>
  <div>
    <st-button :disabled="disabled" type="text">Text Button</st-button>
  </div>
  <div style="margin: 20px 0">
    <st-button :disabled="disabled" type="text" icon="bucket">Отменить бронирование</st-button>
    <st-button :disabled="disabled" type="text" icon="repeat">Повторить заказ</st-button>
    <st-button :disabled="disabled" type="text" icon="copy">Скопировать</st-button>
    <st-button :disabled="disabled" type="text" icon="star">Добавить в избранное</st-button>
    <st-button :disabled="disabled" type="text" icon="upload">Загрузите список в формате .xls (.xlsx)</st-button>
    <st-button :disabled="disabled" type="text" icon="advanced-search" search>Расширеный поиск</st-button>
  </div>
</div>
`;

storiesOf('Components|Button', module).add('Text', () => ({
  template: `<div>${template}</div>`,
  props: {
    disabled: {
      default: boolean('Disabled', false),
    }
  },
}));

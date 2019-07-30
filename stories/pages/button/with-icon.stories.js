import { storiesOf } from '@storybook/vue'

import { boolean } from '@storybook/addon-knobs';

const template = `
<div>
  <h4>Basic usage</h4>
  <div>
    <st-button :disabled="disabled" type="secondary" icon="check" circle approve></st-button>
    <st-button :disabled="disabled" type="secondary" icon="cross" circle cancel></st-button>
  </div>
  <div>
    <st-button :disabled="disabled" type="secondary" icon="check" circle approve bold-border></st-button>
    <st-button :disabled="disabled" type="secondary" icon="cross" circle cancel bold-border></st-button>
  </div>
  <div style="margin: 20px 0">
    <st-button :disabled="disabled" type="default" icon="cross" size="mini">Закрыть карту</st-button>
    <st-button :disabled="disabled" type="secondary" icon="location" size="mini">Поиск на карте</st-button>
  </div>
  <div>
    <st-button :disabled="disabled" type="secondary" icon="plus">Создать заказ</st-button>
    <st-button :disabled="disabled" type="info" icon="circle-plus" size="medium">Добавить перелет</st-button>
  </div>
</div>
`;

storiesOf('Components|Button', module).add('With Icon', () => ({
  template: `<div>${template}</div>`,
  props: {
    disabled: {
      default: boolean('Disabled', false),
    }
  },
}));

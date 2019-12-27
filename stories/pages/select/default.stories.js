import { storiesOf } from '@storybook/vue'
import { boolean, text, array, radios, select, number } from '@storybook/addon-knobs';
import { template } from '../../templates/select/default.template';
import documentation from '../../documentation/select.md'
import { iconsList, sizeOptions } from '../../utils/props-options';

storiesOf('Components|Select', module).add('Default', () => ({
  template,
  props: {
    multiple: {
      default: boolean('multiple', false),
    },
    disabled: {
      default: boolean('disabled', false),
    },
    required: {
      default: boolean('required', false),
    },
    clearable: {
      default: boolean('clearable', true),
    },
    readonly: {
      default: boolean('readonly', false),
    },
    loading: {
      default: boolean('loading', false),
    },
    size: {
      default: radios('size', sizeOptions, ''),
    },
    placeholder: {
      default: text('placeholder', 'Select placeholder'),
    },
    prefixIcon: {
      default: select('prefix-icon', iconsList, ''),
    },
    suffixIcon: {
      default: select('suffix-icon', iconsList, ''),
    },
    showArrowIcon: {
      default: boolean('show-arrow-icon', true),
    },
    clearIconAsArrowIcon: {
      default: boolean('clear-icon-as-arrow-icon', true),
    },
  },
  data() {
    return {
      value: null,
      options: [
        { value: 'first', label: 'Option 1' },
        { value: 'second', label: 'Option 2' },
        { value: 'third', label: 'Option 3' },
        { value: 'fourth', label: 'Option 4' },
        { value: 'fifth', label: 'Option 5', disabled: true },
      ]
    }
  },
  watch: {
    multiple: {
      immediate: true,
      handler(isMultiple) {
        this.value = isMultiple ? [] : null;
      }
    }
  },
}), {
  notes: { markdown: documentation },
});

import { storiesOf } from '@storybook/vue'
import { boolean, text, array, select, number } from '@storybook/addon-knobs';
import { template } from '../../templates/autocomplete/default.template';
import documentation from '../../documentation/autocomplete.md'
import { iconsList } from '../../utils/props-options';
import { countriesList } from '../../utils/countries-list';

storiesOf('Components|Autocomplete', module).add('Default', () => ({
  template,
  props: {
    disabled: {
      default: boolean('disabled', false),
    },
    loading: {
      default: boolean('loading', false),
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
    placeholder: {
      default: text('placeholder', 'Autocomplete placeholder'),
    },
    prefixIcon: {
      default: select('prefix-icon', iconsList, ''),
    },
    suffixIcon: {
      default: select('suffix-icon', iconsList, ''),
    },
    fetchSuggestionsDelay: {
      default: number('fetch-suggestions-delay', 300),
    },
    fetchOnFocus: {
      default: boolean('fetch-on-focus', false),
    },
    queryMinLength: {
      default: number('query-min-length', 1),
    },
    closeOnSelect: {
      default: boolean('close-on-select', true),
    },
    closeOnClear: {
      default: boolean('close-on-select', true),
    },
    responseTimeout: {
      default: number('*FOR TEST | Response timeout', 500),
    }
  },
  data() {
    return {
      value: '',
      exampleOptions: countriesList,
    }
  },
  methods: {
    fetchSuggestionsExample(query, callback) {
      setTimeout(() => {
        callback(this.exampleOptions.filter(option =>
          option.label.toLowerCase().indexOf(query.toLowerCase()) === 0,
        ));
      }, this.responseTimeout);
    },
    onSelect(suggestion) {
      this.value = suggestion.label;
    }
  }
}), {
  notes: { markdown: documentation },
});

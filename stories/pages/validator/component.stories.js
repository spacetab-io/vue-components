import {
  boolean,
  number,
} from '@storybook/addon-knobs';
import {
  storiesOf,
} from '@storybook/vue3';

import {
  ComponentValidator,
  LengthInRange,
  NotEmptyRule,
  NotEmptyArrayRule,
} from '../../../src/utils/validation';
import documentation from '../../documentation/validator/component.md';
import {
  template,
} from '../../templates/validator/component.template';
import { countriesList } from '../../utils/countries-list';


storiesOf('Validator', module).add('Component', () => ({
  template,
  props: {
    // Input
    minLength: {
      default: number('input | Minimum length', 5, void 0, 'Input validation'),
    },
    maxLength: {
      default: number('input | Maximum length', 10, void 0, 'Input validation'),
    },
    // Select
    selectNotEmpty: {
      default: boolean('select | Not empty', true, 'Select validation'),
    },
    selectRequired: {
      default: boolean('select | Required', true, 'Select validation'),
    },
    // Autocomplete
    autocompleteNotEmpty: {
      default: boolean('autocomplete | Not empty', true, 'Autocomplete validation'),
    },
    autocompleteRequired: {
      default: boolean('autocomplete | Required', true, 'Autocomplete validation'),
    },
  },
  watch: {
    // Input
    minLength: 'reinitializeInputValidators',
    maxLength: 'reinitializeInputValidators',
    // Select
    selectNotEmpty: 'reinitializeSelectValidators',
    selectRequired: 'reinitializeSelectValidators',
    // Autocomplete
    autocompleteNotEmpty: 'reinitializeAutocompleteValidators',
    autocompleteRequired: 'reinitializeAutocompleteValidators',
  },
  methods: {
    // Input
    getInputValidator() {
      const validator = new ComponentValidator(false);
      validator.addRule(new LengthInRange(this.minLength, this.maxLength));

      return validator;
    },
    reinitializeInputValidators() {
      this.inputValidator = this.getInputValidator();
    },

    // Select
    getSelectValidators() {
      const singleSelectValidator = new ComponentValidator(this.selectRequired);
      const multipleSelectValidator = new ComponentValidator(this.selectRequired);
      if (this.selectNotEmpty) {
        singleSelectValidator.addRule(new NotEmptyRule());
        multipleSelectValidator.addRule(new NotEmptyArrayRule());
      }

      return {
        singleSelectValidator,
        multipleSelectValidator,
      };
    },
    reinitializeSelectValidators() {
      const {
        singleSelectValidator,
        multipleSelectValidator,
      } = this.getSelectValidators();

      this.singleSelectValidator = singleSelectValidator;
      this.multipleSelectValidator = multipleSelectValidator;
    },

    // Autocomplete
    getAutocompleteValidator() {
      const validator = new ComponentValidator(this.autocompleteRequired);
      // if (this.autocompleteNotEmpty) {
        validator.addRule(new NotEmptyRule());
      // }

      return validator;
    },
    reinitializeAutocompleteValidators() {
      this.autocompleteValidator = this.getAutocompleteValidator();
    },
    fetchAutocompleteSuggestions(query, callback) {
      callback(this.autocompleteOptions.filter(option =>
        option.toLowerCase().indexOf(query.toLowerCase()) === 0,
      ));
    }
  },
  data() {
    const inputValidator = this.getInputValidator();
    const {
      singleSelectValidator,
      multipleSelectValidator,
    } = this.getSelectValidators();
    const autocompleteValidator = this.getAutocompleteValidator();

    return {
      // Input
      inputValue: '',
      inputValidator: inputValidator,

      // Select
      selectOptions: new Array(5)
        .fill('')
        .map((item, index) => ({
          label: `Option ${index}`,
          value: `${index}`,
        })),
      singleSelectValue: '',
      multipleSelectValue: [],
      singleSelectValidator: singleSelectValidator,
      multipleSelectValidator: multipleSelectValidator,

      // Autocomplete
      autocompleteOptions: countriesList.map(country => country.label),
      autocompleteValue: '',
      autocompleteValidator: autocompleteValidator,
    };
  },
}), {
  notes: { markdown: documentation },
});

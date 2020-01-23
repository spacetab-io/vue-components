import {
  boolean,
  number,
} from '@storybook/addon-knobs';
import {
  storiesOf,
} from '@storybook/vue';

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


storiesOf('Validator', module).add('Component', () => ({
  template,
  props: {
    // Input
    minLength: {
      default: number('Minimum length', 5, void 0, 'Input validation'),
    },
    maxLength: {
      default: number('Maximum length', 10, void 0, 'Input validation'),
    },
    // Select
    notEmpty: {
      default: boolean('Not empty', true, 'Select validation'),
    },
    selectRequired: {
      default: boolean('Required', true, 'Select validation'),
    },
  },
  watch: {
    // Input
    minLength: 'reinitializeInputValidators',
    maxLength: 'reinitializeInputValidators',
    // Select
    notEmpty: 'reinitializeSelectValidators',
    selectRequired: 'reinitializeSelectValidators',
  },
  methods: {
    // Input
    getInputValidator() {
      const inputValidator = new ComponentValidator(false);
      inputValidator.addRule(new LengthInRange(this.minLength, this.maxLength));

      return inputValidator;
    },
    reinitializeInputValidators() {
      this.inputValidator = this.getInputValidator();
    },

    // Select
    getSelectValidators() {
      const singleSelectValidator = new ComponentValidator(this.selectRequired);
      const multipleSelectValidator = new ComponentValidator(this.selectRequired);
      singleSelectValidator.addRule(new NotEmptyRule());
      multipleSelectValidator.addRule(new NotEmptyArrayRule());

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
    }
  },
  data() {
    const inputValidator = this.getInputValidator();
    const {
      singleSelectValidator,
      multipleSelectValidator,
    } = this.getSelectValidators();

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
    };
  },
}), {
  notes: { markdown: documentation },
});

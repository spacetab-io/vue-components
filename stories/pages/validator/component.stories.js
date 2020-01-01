import { number } from '@storybook/addon-knobs';
import {
  storiesOf,
} from '@storybook/vue';

import {
  ComponentValidator,
  LengthInRange,
} from '../../../src/utils/validation';
import documentation from '../../documentation/validator/component.md';
import { template } from '../../templates/validator/component.template';

storiesOf('Validator', module).add('Component', () => ({
  template,
  props: {
    minLength: {
      default: number('Minimum length', 5, void 0, 'Input validation'),
    },
    maxLength: {
      default: number('Maximum length', 10, void 0, 'Input validation'),
    },
  },
  watch: {
    minLength: 'reinitializeValidators',
    maxLength: 'reinitializeValidators',
  },
  methods: {
    reinitializeValidators() {
      const validator = new ComponentValidator(false);
      validator.addRule(new LengthInRange(this.minLength, this.maxLength));

      this.inputValidator = validator;
    },
  },
  data() {
    const validator = new ComponentValidator(false);
    validator.addRule(new LengthInRange(this.minLength, this.maxLength));

    return {
      inputValue: '',
      inputValidator: validator,
    };
  },
}), {
  notes: { markdown: documentation },
});

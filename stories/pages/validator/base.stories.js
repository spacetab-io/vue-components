import '../../assets/scss/validate.scss';

import {
  boolean,
  number,
  text,
} from '@storybook/addon-knobs';
import {
  storiesOf,
} from '@storybook/vue';

import {
  FieldValidator,
  LengthInRange,
  PassRegexpRule,
} from '../../../src/utils/validation';
import documentation from '../../documentation/validator/base.md';
import {
  template,
} from '../../templates/validator/base.template';


storiesOf('Validator', module).add('Base', () => ({
  template,
  props: {
    value1: {
      default: text('Value', 'Value 1', 'value 1'),
    },
    minLength1: {
      default: number('Minimum length', 0, void 0, 'value 1'),
    },
    maxLength1: {
      default: number('Maximum length', 10, void 0, 'value 1'),
    },
    required1: {
      default: boolean('Required', false, 'value 1'),
    },
    value2: {
      default: text('Value ', 'Value 2', 'value 2'),
    },
    passRegexp2: {
      default: text('Regexp', '^[A-Za-z]*$', 'value 2'),
    },
    passRegexpFlags2: {
      default: text('Regexp flags', 'gu', 'value 2'),
    },
    required2: {
      default: boolean('Required ', false, 'value 2'),
    },
  },
  watch: {
    value1: 'validate',
    value2: 'validate',
    minLength1: 'resetValidator',
    maxLength1: 'resetValidator',
    required1: 'resetValidator',
    passRegexp2: 'resetValidator',
    passRegexpFlags2: 'resetValidator',
    required2: 'resetValidator',
  },
  methods: {
    createValidator1() {
      const validator = new FieldValidator(this.required1);
      validator.addRule(new LengthInRange(this.minLength1, this.maxLength1));
      return validator;
    },
    createValidator2() {
      const validator = new FieldValidator(this.required2);
      validator.addRule(new PassRegexpRule(this.passRegexp2, this.passRegexpFlags2));
      return validator;
    },
    resetValidator() {
      this.validator1 = this.createValidator1();
      this.validator2 = this.createValidator2();
      this.validate();
    },
    validate() {
      this.isValid1 = this.validator1.validate(this.value1);
      this.isValid2 = this.validator2.validate(this.value2);
    },
  },
  data() {
    return {
      validator1: this.createValidator1(),
      validator2: this.createValidator2(),
      isValid1: true,
      isValid2: true,
    };
  },
  created() {
    this.validate();
  },
}), {
  notes: { markdown: documentation },
});

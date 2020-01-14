/* eslint-disable no-useless-constructor */
import {
  Vue,
} from 'vue/types/vue';

type AfterValidationCallback = (validationResult: boolean) => void;

export class FatalValidationError extends Error {}

export interface ValidationRule<T> {
  validate(model: T): boolean;
}

export interface ValidatableComponent<T> extends Vue {
  validateValue: () => T;
}

export class FieldValidator<T> {
  private prevValidationResult: boolean = false;

  private afterValidation?: AfterValidationCallback;

  constructor(
    private required: boolean = false,
  ) {
    // pass
  }

  private rules: ValidationRule<T>[] = [];

  public addRule(rule: ValidationRule<T>): void {
    this.rules.push(rule);
  }

  public onAfterValidation(afterValidation: AfterValidationCallback) {
    this.afterValidation = afterValidation;
  }

  public addRules(rules: ValidationRule<T>[]): void {
    this.rules.concat(rules);
  }

  public validate(model: T): boolean {
    if (!this.required && (model === undefined || model === null)) {
      return true;
    }

    if (!this.required && typeof model === 'string' && model === '') {
      return true;
    }

    this.prevValidationResult = this.rules.every((rule: ValidationRule<T>) => rule.validate(model));

    if (this.afterValidation) {
      this.afterValidation(this.prevValidationResult);
    }

    return this.prevValidationResult;
  }

  get isValid() {
    return this.prevValidationResult;
  }
}

export class ComponentValidator<T> extends FieldValidator<T> {
  component?: ValidatableComponent<T>;

  public setComponent(component: ValidatableComponent<T>): void {
    this.component = component;
  }

  public validate(): boolean {
    if (!this.component) {
      throw new FatalValidationError('Component not initialized');
    }
    const model = this.component.validateValue();

    return super.validate(model);
  }
}

export class NotEmptyRule implements ValidationRule<string> {
  public validate(model: string): boolean {
    return model !== '';
  }
}

export class LengthInRange implements ValidationRule<string> {
  constructor(
    public min: number,
    public max: number,
  ) {
    // pass
  }

  public validate(model: string): boolean {
    return model.length >= this.min && model.length <= this.max;
  }
}

export class PassRegexpRule implements ValidationRule<string> {
  constructor(
    private regexp: string,
    private flags: string = 'gu',
  ) {
    // pass
  }

  public validate(model: string): boolean {
    const regexp = new RegExp(this.regexp, this.flags);
    return regexp.test(model);
  }
}

export class FormValidator<T = any> {
  private validators: ComponentValidator<T>[] = [];

  public addValidator(validator: ComponentValidator<T>): void {
    this.validators.push(validator);
  }

  public addValidators(validators: ComponentValidator<T>[]): void {
    this.validators.concat(validators);
  }

  public isValid() {
    return this.validators.every((validator: ComponentValidator<T>) => validator.isValid);
  }

  public validate(forceAll: boolean = false) {
    if (!forceAll) {
      return this.validators.every((value: ComponentValidator<T>) => value.validate());
    }

    let valid = true;
    this.validators.forEach((validator: ComponentValidator<T>) => {
      if (!validator.validate()) {
        valid = false;
      }
    });

    return valid;
  }
}

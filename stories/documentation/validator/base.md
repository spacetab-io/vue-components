# Documentation

## `FieldValidator<T>`
### Constructor params
| name | default | required | description |
| --- | --- | --- | --- |
| required | false | no | Is field required to be filled. (Empty string is not valid.) |


### Additional methods

```addRule(rule: ValidationRule<T>): void``` - add 1 validation rule to validator

```addRules(rules: ValidationRule<T>[]): void``` - add array of validation rules to validator

```validate(model: T): bool``` - going through all validation rules and validate the passed value


## `ValidationRule`

You can use your own validation rules. Only 1 thing what you need to do. Is implements `ValidationRule<T>` interface

```
// Interface looks like
interface ValidationRule<T> {
  validate(model: T): boolean;
}
```

Also, we have predefined validation rules.

| name | type |
| --- | --- |
| NotEmptyRule | string |
| LengthInRange | string |
| PassRegexpRule | string |

Example usage:

```
const validator = new FieldValidator<string>();
validator.addRule(new LenthInRange(1, 13));
validator.validate('not valid string');
validator.validate('valid string');
```

# Documentation

## Usage in components
Simple usage
```
// js
const validator = new ComponentValidator();
validator.addRule(new YourRule());

// html
<st-component validator="validator">
```
If you want to manage all form, you can pass your validators to form class

```
// js
const formValidator = new FormValidator();

const validator = new ComponentValidator();
validator.addRule(new YourRule());

formValidator.addValidator(validator);

// Validate all fields (return false if one or more values are not valid).
// Return false after first not valid value.
formValidator.validate();

// Validate all fields (return false if one or more values are not valid)
// Not stops after first validator failture
formValidator.validate(true);

// html
<st-component validator="validator">
```

## Integration to new components
Example integration.
```
type ValueType = string;

class YourComponent extends Vue implements ValidatableComponent<ValueType> {
    // Your value which must be validated
    value!: ValueType;
    
    // Property with your component validator istance
    @Prop(ComponentValidator)
    validator?: ComponentValidator<ValueType>;

    // Some property.
    isValid: boolean = true;

    // Revalidate value on every value change
    @Watch('value')
    onValueChanged(newValue: string) {
        if (this.validator) {
            this.validator.validate(newValue);
        }
    }
    
    // This part is very important, by this code you pass the instance where value is from.
    @Watch('validator', { immediate: true })
    onValidatorChanged(newValidator: ComponentValidator<string>): void {
        newValidator.setComponent(this);
        
        // Proceed validation result update.
        // Validation can be runned directly.
        // That's why prefer to use callback for component manipulations. 
        newValidator.onAfterValidation((newValue: boolean) => {
            this.isValid = newValue;
        });
    }
    
    // This function runs validator to get current value available for validation.
    validateValue(): string {
        return this.value;
    }
}
```

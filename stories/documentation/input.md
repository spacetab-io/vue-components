# Documentation

## Example of Usage

```javascript
{
    inputValue: '', // for v-model
    readonly: false,
    disabled: false,
}
```

```html
<st-input v-model="inputValue" />
```

If you want more input-like behaviour with clearable prop, use the component this way:

```html
<st-input v-model="inputValue" 
          :clearable="!disabled && !readonly" />
```

## Attributes

| Name | Description | Required | Type | Default value | Possible values |
| --- | --- | --- | --- | --- | --- |
| size | Input's size | false | String | - | mini/small/medium/large/extra-large |
| clearable | Is Input clearable | false | boolean | false | true/false |
| prefix-icon | Input's prefix icon (at left) | false | String | - | * |
| suffix-icon | Input's suffix icon (at right) | false | String | - | * |
| value | Input's value | false | String | - | * |
| type | Input's attribute type (native) | false | String | - | * |
| required | Defines required property | false | boolean | false | true/false |
| disabled | Defines disabled property | false | boolean | false | true/false |
| readonly | Defines readonly property | false | boolean | false | true/false |
| placeholder | Input's placeholder | false | String | - | * |
| maxlength | Input's maxlength | false | Number | - | * |
| name | Input's name for form | false | String | - | * |
| pattern | Input's pattern | false | String | - | * |
| focus-after-clear | Will focus input after clear | false | boolean | false | true/false |
| clear-icon-as-suffix-icon | Use suffix icon as clear icon. It will change suffix icon to cross when input isn't empty | false | boolean | false | true/false |
| tabindex | Input's tabindex | false | Number | - | * |
| focus-state | Defines focus state for input's wrapper. Nice thing if you use input inside your component and need to handle 'focused' class at wrapper manually | false | Boolean | false | true/false |
| prevent-input | Defines preventing native input event. If it's true component will fire input event but won't change inner value.  | false | boolean | false | true/false |

## Events

| Name | Description | Arguments |
| --- | --- | --- |
| input | Fires when value changed | Value's result (v-model) |
| change | Fires when value changed | value |
| clear | Fires when clear button was clicked | - |
| focus | Fires when focused | event |
| blur | Fires when blurred | event |
| keydown | Fires on keydown event | event |
| keyup | Fires on keyup event | event |
| keypress | Fires on keypress event | event |

## Slots (for every Select)

| Name | Description | Prop name |
| --- | --- | --- |
| prefix | Defines prefix content in select (at the left as default) | - |
| default | Defines content after inner input | - |
| suffix | Defines suffix content in select (at the right as default) | - |

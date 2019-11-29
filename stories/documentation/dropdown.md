# Documentation

Component `Dropdown` is used in components like `Select`, `Autocomplete` and etc. Looks like `Popper`.

## Example of Usage

The idea of usage:

```html
<st-dropdown>
  <st-dropdown-option v-for="index in 10">
    Option {{ index }}  
  </st-dropdown-option>
</st-dropdown>
```

Here's an example with more information of usage:

```html
<st-dropdown :popper-props="{ trigger: 'hover' }"
             :disabled="readonly" 
             :disabled="disabled">
  <st-dropdown-option v-for="(item, index) in anyList" 
                      :key="index" 
                      :readonly="readonly" 
                      :disabled="item.disabled"
                      :class="{ 'any-list-item--selected': item.selected }" 
                      @click="onClickHandler">
    {{ item.label }}
  </st-dropdown-option>
</st-dropdown>
```

## Attributes

### Dropdown

| Name | Description | Required | Type | Default value | Possible values |
| --- | --- | --- | --- | --- | --- |
| popper-props | Popper's component properties | - | object | { arrowVisible: false, placement: bottom, trigger: click, boundariesSelector: 'body', appendToBody: false } | CHECK POPPER COMPONENT DOCUMENTATION |
| popper-class | Defines Popper's `popper-class` property | - | string | - | - |
| popper-value | **Only `trigger: manual`** <br> Defines Popper's `value` prop. Use it to make custom popper's visibility | - | boolean | - | true / false |
| disabled | Defines disabled property | - | boolean | false | true / false |
| readonly | Defines readonly property | - | boolean | false | true / false |

### Dropdown-option

| Name | Description | Required | Type | Default value | Possible values |
| --- | --- | --- | --- | --- | --- |
| disabled | Defines disabled property | - | boolean | false | true / false |
| readonly | Defines readonly property | - | boolean | false | true / false |

## Events

### Dropdown

| Name | Description | Arguments |
| --- | --- | --- |
| show | Fires on dropdown show | - |
| hide | Fires on dropdown hide | - |
| document-click | Fires on click outside of dropdown and dropdown's reference element | - |

## Slots

### Dropdown

| Name | Description | Props |
| --- | --- | --- |
| reference | `Popper`'s 'reference' slot. Defines content that will open popper | - |
| top | Defines content before (below) dropdown's list | - |
| default | Defines inner content of dropdown - the inner list of options | - |
| bottom | Defines content after (above) dropdown's list | - |

### Dropdown-option

| Name | Description | Props |
| --- | --- | --- |
| default | Defines content inside component | - |

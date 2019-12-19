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
| v-model | Dropdown visibility value (**with manual trigger only**) | false | boolean | - | - |
| width | Dropdown width | false | number | - | - |
| max-height | Dropdown max-height | false | number | - | - |
| arrow-visible | Show or hide dropdown's arrow | false | boolean | false | - |
| with-border | Show or hide dropdown's border | false | boolean | true | - |
| popper-class | Additional dropdown's popper class | false | string | - | - |
| placement | Dropdown priority placement | false | string | {{DEFAULT_PLACEMENT}} | {{AVAILABLE_PLACEMENTS}} |
| trigger | Dropdown trigger type | false | string | {{DEFAULT_TRIGGER}} | {{AVAILABLE_TRIGGERS}} |
| append-to-body | Append dropdown to body | false | boolean | false | - |
| stop-propagation | Runs event.stopPropagation function | false | boolean | false | - |
| prevent-default | Runs event.preventDefault function | false | boolean | false | - |
| force-show | Dropdown's force visibility | false | boolean | false | - |
| disabled | Defines dropdown's disabled state | false | boolean | false | - |
| boundaries-selector | The element which will define the boundaries of the dropdown position. The dropdown will never be placed outside of the defined boundaries | false | string | 'body' | - |
| delay-on-mouse-over | Delay mouse over on popper in milliseconds | false | number | 100 | - |
| delay-on-mouse-out | Delay mouse out of popper in milliseconds | false | number | 100 | - |
| enter-active-class | Enter transition active class | false | string | - | - |
| leave-active-class | Leave transition active class | false | string | - | - |
| transition | Transition name | false | string | - | - |

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

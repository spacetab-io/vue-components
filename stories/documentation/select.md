# Documentation

Component "Select". More customizable than default select tag.

## Example of Usage

```javascript
{
    singleValue: null, // for single select
    multipleValue: [], // for multiple select
    options: [
        { value: 'first', label: 'Option 1' },
        { value: 'second', label: 'Option 2' },
        { value: 'third', label: 'Option 3' },
        { value: 'fourth', label: 'Option 4' },
        { value: 'fifth', label: 'Option 5', disabled: true },
    ]
}
```

```html
<!-- Single Select usage -->
<st-select v-model="singleValue" 
           :options="options" />
```

```html
<!-- Multiple Select usage -->
<st-select v-model="multipleValue" 
           :options="options" 
           multiple />
```

This component pretty customizable, you can change a lot of things via slots. 
Here's some examples:

```html
<st-select v-model="singleValue" 
           :options="options">
  <template v-slot:prefix>
    <!-- any content -->
  </template>
  <template v-slot:suffix>
    <!-- any content -->
  </template>
  <template v-slot:dropdown-top>
    <!-- any content -->
  </template>
  <template v-slot:dropdown-bottom>
    <!-- any content -->
  </template>
  <template v-slot:option="{ option }">
    <st-icon name="location" /> {{ option.label }}
  </template>
</st-select>
           
<!-- Multiple select has some extra slots -->
<st-select v-model="multipleValue" 
           :options="options"  
           multiple>
    <template v-slot:collapser-control="{ amount }">
      [{{ amount }} more]
    </template>
    <template v-slot:collapser-list="{ elements }">
      <div v-for="element in elements" 
           class="some-class-name">
        {{ element }}
      </div>
    </template>
</st-select>
```

Also you can change/extend inner dropdown's props via `dropdown-popper-props` (same with `collapser-popper-props`):

```html
<st-select v-model="singleValue" 
           :options="options" 
           :dropdown-popper-props="{
             width: 400,
             maxHeight: 250,
             arrowVisible: true,
             placement: 'top',
             trigger: 'hover',
           }" />
```

You can find out more about this component slots in the bottom of documentation. 

## Attributes

| Name | Description | Required | Type | Default value | Possible values |
| --- | --- | --- | --- | --- | --- |
| value / v-model | Defines selected result | True | String (single) / String[] (multiple) | - | * |
| options | Array of options to select | True | Array | - | * |
| placeholder | Select's placeholder | - | String | - | * |
| disabled | Defines disabled property | - | Boolean | False | True / False |
| readonly | Defines readonly property | - | Boolean | False | True / False |
| required | Defines required property | - | Boolean | False | True / False |
| clearable | Defines possibility of clear selected options (resetting) | - | Boolean | True | True / False |
| loading | Defines loading state | - | Boolean | False | True / False |
| size | Defines component's size | - | String | - | mini / small / medium / large / extra-large |
| prefixIcon | Defines prefix icon name (at the left side) | - | String | - | CHECK ICON COMPONENT |
| suffixIcon | Defines suffix icon name (at the right side) | - | String | - | CHECK ICON COMPONENT |
| dropdown-popper-props | Dropdown popper's component properties | - | Object | arrowVisible: false, placement: bottom, trigger: click, boundariesSelector: 'body' | CHECK POPPER COMPONENT DOCUMENTATION |
| collapser-popper-props | **(Multiple Select only)** Collapser popper's component properties | - | Object | arrowVisible: true, placement: top, trigger: hover, boundariesSelector: 'body', appendToBody: false | CHECK POPPER COMPONENT DOCUMENTATION |

## Events

| Name | Description | Arguments |
| --- | --- | --- |
| input | Fires when value changed | Value's result (v-model) |
| select | Fires when any option was selected | Option |
| clear | Fires when clear button was clicked | - |
| dropdown-show | Fires on dropdown show | - |
| dropdown-hide | Fires on dropdown hide | - |

## Slots (for every Select)

| Name | Description | Prop name |
| --- | --- | --- |
| prefix | Defines prefix content in select (at the left as default) | - |
| suffix | Defines suffix content in select (at the right as default) | - |
| dropdown-top | Defines content in select's dropdown, above the list | - |
| dropdown-bottom | Defines content in select's dropdown, below the list | - |
| list | Defines select dropdown's list | { options } |
| option | Defines select dropdown option's content | { option } |
| collapser-control | **(Multiple Select only)** Defines collapser control's block content | { amount } |
| collapser-list | **(Multiple Select only)** Defines collapser list's content | { elements } |
| collapser-element | **(Multiple Select only)** Defines collapser list element's content | { element } |
| collapser-hidden-list | **(Multiple Select only)** Defines collapser hidden list's content | { hiddenElements } |
| collapser-hidden-element | **(Multiple Select only)** Defines collapser hidden list element's content | { hiddenElement } |

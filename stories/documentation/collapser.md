# Documentation

`Collapser` - component which makes your inline lists cooler: if some list items don't fit in your wrapper, they will be hidden.

## Example of Usage

For elements with `string[]` type:

```javascript
{
  elements: [
    'Item 1',
    'Item 2',
    // ...
  ]
}
```

```html
<st-collapser :elements="elements"></st-collapser>
``` 

For elements with `any[]` type:

```javascript
{
  elements: [
    {
      label: 'Item 1',
      className: 'custom-class-name', // you can use an additional class name for list' items
      // ...
    },
    // { ... }
  ]
}
```

```html
<st-collapser :elements="elements">
  <template v-slot:element="{ element }">
    {{ element.label }}
  </template>
  <template v-slot:hiddenElement="{ element }">
    {{ element.label }}
  </template>
</st-collapser>
```

And also you can change control block via `control` slot:

```html
<st-collapser :elements="elements">
  <template v-slot:element="{ element }">
    {{ element.label }}
  </template>
  <template v-slot:hiddenElement="{ element }">
    {{ element.label }}
  </template>
  <template v-slot:control>
    <st-icon name="dots-horizontal"></st-icon>    
  </template>
</st-collapser>
```

## Slots

| Name | Description | Prop name |
| --- | --- | --- |
| element | Defines list's element content | element |
| hiddenElement | Defines hidden list's element content | element |
| control | Defines block for showing hidden elements | amount |

## Attributes

| Name | Description | Required | Type | Default value | Possible values |
| --- | --- | --- | --- | --- | --- |
| elements | Elements to render | True | String[]/Any[] | [] | - |
| list-class | Defines additional class name for list | - | String | - | - |
| element-class | Defines function for additional class name of list's element | - | (element: Object | string, index: Number): String | - | - |
| hidden-list-class | Defines additional class name for hidden list | - | String | - | - |
| hidden-element-class | Defines function for additional class name of hidden list's element | - | (element: Object | string, index: Number): String | - | - |
| popper-props | Popper's component properties | - | Object | arrowVisible: false, placement: bottom, trigger: hover, boundariesSelector: 'body' | CHECK POPPER COMPONENT DOCUMENTATION |

## Events

| Name | Description | Arguments |
| --- | --- | --- |
| element-click | Fires when element from list was clicked | Elements' item |
| hidden-element-click | Fires when element from hidden list was clicked | Elements' item |
| hidden-elements-change | Fires when list of hidden elements was changed | Hidden elements amount |

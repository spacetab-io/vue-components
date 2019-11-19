# Documentation

## Example of Usage

You can use component Tabs as it is. Just use component's attributes correctly.

```javascript
// ...
tabsElements = [
  { id: 'tab-1', label: 'Tab №1', icon: 'warning' },
  { id: 'tab-2', label: 'Tab №2', closeable: true }
];

onSelect(tab) {
  // some stuff on tab select
}

onClose(tab) {
  // some stuff on tab close
}
// ...
```

```html
<!-- Default Tabs -->
<st-tabs :tabs="tabsElements"
         @select="onSelect" 
         @close="onClose" />
         
<!-- Collapsed Tabs -->
<st-tabs collapsed
         :tabs="tabsElements"
         @select="onSelect" 
         @close="onClose" />
```

Or, if you want to make your tabs look as you want you can use slots there.

```html
<!-- Default Tabs -->
<st-tabs :tabs="tabsElements"
         @select="onSelect" 
         @close="onClose">
    <template v-slot:tab="{ tab }">
      wow! {{ tab.label }}
    </template>
</st-tabs>

<!-- Collapsed Tabs -->
<st-tabs collapsed
         :tabs="tabsElements"
         @select="onSelect" 
         @close="onClose">
    <template v-slot:tab="{ tab }">
      wow! {{ tab.label }}
    </template>
    <template v-slot:hidden-tab="{ tab }">
      hidden! {{ tab.label }}
    </template>
</st-tabs>
```

## Slots

| Name | Description | Prop name |
| --- | --- | --- |
| tab | Defines list's element content | tab |
| hidden-tab | **(Collapsed Tabs only)** Defines hidden list's element content | tab |

## Attributes

| Name | Description | Required | Type | Default value | Possible values |
| --- | --- | --- | --- | --- | --- |
| tabs | Tabs list | true | Array | - | - |
| v-model | Defines selected tab's id | false | String | - | - |
| collasped | Define collapser functionality for tabs | false | Boolean | false | - |
| collapser-popper-props | **(Collapsed Tabs only)** Collapser's popper props | false | Object | - | CHECK POPPER COMPONENT |

## Tab (tabs list item) attributes

| Name | Description | Required | Type | Default value | Possible values |
| --- | --- | --- | --- | --- | --- |
| id | Tab identification | true | String | - | - |
| label | Tab label | true | String | - | - |
| icon | Tab icon. Use name from our component Icon | - | String | - | CHECK ICON COMPONENT |
| closeable | Defines is tab closeable | - | Boolean | false | - |

## Events

| Name | Description | Arguments |
| --- | --- | --- |
| select | Triggers when tab is clicked | Tab |
| close | Triggers when tab's close icon is clicked | Tab |

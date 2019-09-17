# Documentation

## Example of Usage

You can use component Tabs as it is. Just use component's attributes correctly.

```javascript
// ...
activeTab = 1;
tabsElements = [
  { id: 1, label: 'Tab №1', icon: 'warning' },
  { id: 2, label: 'Tab №2', closeable: true }
];

get elements() {
  return this.tabsElements.map(item => ({
    id: item.id,
    label: item.label,
    active: this.activeTabId === item.id,
    closeable: this.closeable,
    icon: this.icon,
  }));
}

onSelect(tab) {
  this.activeTab = tab.id;
  // some stuff on tab select
}

onClose(tab) {
  this.tabsElements = this.tabsElements.filter(item => item.id !== tab.id);
  // some stuff on tab close
}
// ...
```

```html
<st-tabs :tabs="elements"
         @select="onSelect" 
         @close="onClose" />
```

Or, if you want to make your tabs look as you want you can use slots there.

```html
<st-tabs :tabs="elements"
         @select="onSelect" 
         @close="onClose">
    <template v-slot:tab="{ tab }">
      wow! {{ tab.label }}
    </template>
</st-tabs>
```

## Tabs attributes

| Name | Description | Required | Type | Default value | Possible values |
| --- | --- | --- | --- | --- | --- |
| tabs | Tabs list | true | Array | - | - |

## Tab (tabs list item) attributes

| Name | Description | Required | Type | Default value | Possible values |
| --- | --- | --- | --- | --- | --- |
| label | Tab label | true | String | - | - |
| icon | Tab icon. Use name from our component Icon | - | String | - | CHECK ICON COMPONENT |
| closeable | Defines is tab closeable | - | Boolean | false | - |
| active | Defines is tab active | - | Boolean | false | - |

## Tabs events

| Name | Description | Arguments |
| --- | --- | --- |
| select | Triggers when tab is clicked | Tab |
| close | Triggers when tab's close icon is clicked | Tab |

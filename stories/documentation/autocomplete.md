# Documentation

Component "Autocomplete". Type what you want to find and get a suggestions list.

## Example of Usage

You can use `v-model` property only when suggestions' type is `string[]`.
Otherwise, you should use `value` property and listen to `@select` and `@clear` events.
Examples are below.

Usage with `string[]` suggestions:

```html
<st-autocomplete placeholder="Enter country name"
                 prefix-icon="search"
                 :fetch-suggestions="fetchSuggestions"
                 v-model="selectedCountry" />
```

```javascript
// ...

selectedCountry = '';
countriesList = [ 'Afghanistan', 'Albania', 'Angola', ... ];

fetchSuggestions(query, callback) {
    callback(this.countriesList.filter(option =>
      option.toLowerCase().indexOf(query.toLowerCase()) === 0,
    ));
}

// ...
```

Usage with `object[]` suggestions:

```html
<st-autocomplete placeholder="Enter country name"
                 prefix-icon="search"
                 :fetch-suggestions="fetchSuggestions"
                 :value="selectedCountry"
                 @select="onSelect"
                 @clear="selectedCountry = ''">
  <template v-slot:suggestion="{ suggestion }">
    {{ suggestion.label }}
  </template>
</st-autocomplete>
```

```javascript
// ...

selectedCountry = '';
countriesList = [
    { label: 'Afghanistan', id: 'AF' },
    { label: 'Albania', id: 'AL' },
    { label: 'Angola', id: 'AO' },
    { label: 'Anguilla', id: 'AI' },
    ...
];

fetchSuggestions(query, callback) {
    callback(this.countriesList.filter(option =>
      option.label.toLowerCase().indexOf(query.toLowerCase()) === 0,
    ));
}

onSelect(suggestion) {
  this.selectedCountry = suggestion.label;
}

// ...
```

Also you can change/extend inner dropdown's props via `dropdown-props`:

```html
<st-autocomplete placeholder="Enter country name"
                 prefix-icon="search"
                 :fetch-suggestions="fetchSuggestions"
                 v-model="selectedCountry"
                 :dropdown-props="{
                    width: 400,
                    maxHeight: 250,
                    arrowVisible: true,
                    placement: 'top',
                    trigger: 'hover',
                 }"/>
```

## Attributes

| Name | Description | Required | Type | Default value | Possible values |
| --- | --- | --- | --- | --- | --- |
| value | Autocomplete's value | - | string | - | - |
| fetch-suggestions | Defines method to fetch input suggestions. Arguments of method are `(query, callback)`. Return found suggestions via `callback(data)`. | true | function | - | - |
| fetch-suggestions-delay | Defines `fetch-suggestions` debounce's delay | - | number | 300 | - |
| fetch-on-focus | Defines call of `fetch-suggestions` method right after search input focusing | - | boolean | false | - |
| focus-after-clear | Will focus autocomplete after clear | false | boolean | false | true/false |
| query-min-length | Defines minimal length of search value to call `fetch-suggestions` method | - | number | 1 | - |
| close-on-select | Defines closing dropdown right after suggestion select | - | boolean | true | - |
| close-on-clear | Defines closing dropdown right after value clear | - | boolean | true | - |
| prefix-icon | Defines prefix icon name (at the left side) | - | string | - | CHECK ICON COMPONENT |
| suffix-icon | Defines suffix icon name (at the right side) | - | string | - | CHECK ICON COMPONENT |
| clearable | Defines clear possibility | - | boolean | true | - |
| required | Defines required property | - | boolean | false | - |
| disabled | Defines disabled property | - | boolean | false | - |
| readonly | Defines readonly property | - | boolean | false | - |
| placeholder | Search's input placeholder | - | string | - | - |
| loading | Defines loading state | - | boolean | false | - |
| dropdown-props | Dropdown popper's component properties | - | object | { arrowVisible: false, placement: bottom-start, trigger: click, boundariesSelector: 'body', appendToBody: true } | CHECK DROPDOWN COMPONENT DOCUMENTATION |

## Events

| Name | Description | Arguments |
| --- | --- | --- |
| type | Fires on `input` event of search input | typed value |
| focus | Fires when search input was focused | - |
| blur | Fires when search input was blurred | - |
| clear | Fires when value was cleared | '' (empty string) |
| input | Fires when value was changed | value |
| select | Fires when suggestion was selected | suggestion |

## Slots

| Name | Description | Props |
| --- | --- | --- |
| suggestion-top | Defines inner content for top of suggestions | - |
| suggestion | Defines inner content of suggestion | suggestion |
| suggestion-bottom | Defines inner content for bottom of suggestions | - |
| message-query-length | Defines inner content of message about query minimal length | - |
| message-loading | Defines inner content of message about loading state | - |
| message-empty | Defines inner content of message about no results | - |

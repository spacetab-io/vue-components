# Documentation

## Badge use

You can use property `text` to define what badge will be contain:

```html
<st-badge :text="Some text" />
```

Or you can define `Badge`'s content via default slot:

```html
<st-badge>
  Some content
</st-badge>
```

## Badge attributes

| Name | Description | Required | Type | Default value | Possible values |
| --- | --- | --- | --- | --- | --- |
| text | Text inside the badge | - | String | - | * |
| type | Badge's type | - | String | block | block / info / cancel / success / warning / error / custom |
| custom-type | Use this property when prop `type` is 'custom' | - | String | - | * |
| fill | Defines how badge will be filled with background | - | String | full | full / half / none |
| round | Defines badge's round borders | - | Boolean | false | true / false |
| icon | Defines icon near the text. Use name from our component Icon  | - | string | - | CHECK ICON COMPONENT |

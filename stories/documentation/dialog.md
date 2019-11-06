# Documentation

## Example of Usage

```vue
<st-dialog v-model="dialogOpened">
  Some raw content
</st-dialog>

<st-dialog v-model="dialogOpenend">
  <template slot="header">Header</template>

  Content

  <template slot="footer">Footer</template>
</st-dialog>
```

## Properties

| Name | Description | Required | Type | Default value | Possible values |
| --- | --- | --- | --- | --- | --- |
| disable-overlay-close | Disable close dialog by clicking on mask | false | boolean | false | true / false |
| disable-escape-close | Disable close dialog by clicking on escape button | false | boolean | false | true / false |
| width | Dialog custom width | false | string | - | any valid css width value |
| center-content | Are you need to center content in dialog? | false | boolean | false | true / false |
| close-icon | Close icon name | false | string | 'cross' | any available st-icon name |
| hide-close-icon | Do you need hide close icon? | false | boolean | false | true / false |
| placement | Dialog placement in window | false | string | 'default' | 'default', 'center', 'top-left', 'top-center', 'top-right', 'center-left', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right' |
| v-model | dialog visibility control point | true | boolean | - | true / false |

## Slots

| Name | Description |
| --- | --- |
| default | Content slot |
| header | Header content slot |
| footer | Footer content slot |
| html-content | If this slot passed default / header / footer slots will not be used. Need if you do not want cover data. |

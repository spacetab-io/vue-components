# Documentation

## Datepicker props

| Name | Description | Required | Type | Default value | Possible values |
| --- | --- | --- | --- | --- | --- |
| is-range | is datepicker range? | - | boolean | false | - |
| month-visible | count of panels | - | number | 2 | any number |
| now | custom now | - | string | current now date | any date |
| disabled-from | Disabled from date | - | string | - | any date |
| disabled-to | Disabled to date | - | string | - | any date |
| disabled-ranges | Disabled dates ranges | - | {from: string, to: string}[] | [] | - |
| navigation-type | Datepicker panels navigation type | - | string | extended | simple, extended, none |
| inline | Is it inline datepicker? | - | boolean | false | - |
| input-format | Date format inside of input | - | string | 'DD.MM.YYYY' | any valid moment format |
| trigger type | Popper trigger type | - | string | focus | click, hover, focus, manual |
| input-class | Inner input class | - | string | - | any string |
| datepicker-class | Inner datepicker class | - | string | - | any string |
| popper-arrow-visible | Is popper arrow visible? | - | boolean | false | - |
| clearable | Is popper can be cleared? Only for datepicker in popper | - | boolean | true | - |
| popper-placement | Popper placement | - | string | 'auto' | auto-start, auto, auto-end, top-start, top, top-end, right-start, right, right-end, bottom-end, bottom, bottom-start, left-end, left, left-start |
| popper-class | Popper class | - | string | - | any string |
| v-model | date value | - | string / string[] | - | - |
| placeholder | Datepicker's placeholder | false | String | - | * |
| prefix-icon | Datepicker's prefix icon (at left) | false | String | - | * |
| suffix-icon | Datepicker's suffix icon (at right) | false | String | - | * |
| close-on-pick | Should be closed after picking a date? | false | Boolean | - | - |

## Datepicker methods

| Name | Description | Arguments |
| --- | --- | --- |
| open | Opens datepicker's dropdown | - |
| focus | Focuses datepicker's inner input (reference) | - |
| blur | Blurs datepicker's inner input (reference) | - |
| close | Closes datepicker's dropdown | - |

## Datepicker slots
| Name | Description | Default |
| --- | --- | --- |
| reference | As default defines element that opens and closes datepicker | StInput |

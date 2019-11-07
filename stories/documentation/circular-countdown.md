# Documentation

## Example of Usage

```vue
<st-circular-countdown :start-date="startDate"
                       :end-date="endDate"
                       @timer-ends="onTimerEnds"></st-circular-countdown>
```

## Attributes

| Name | Description | Required | Type | Default value | Possible values |
| --- | --- | --- | --- | --- | --- |
| start-date | Start date work. | true | string | - | any valid formatted time |
| end-date | End date work. | true | string | - | any valid formatted time |
| force-style | do you need set custom style? Not calculated by time left | false | string | - | 'info', 'danger', 'success', 'warning' |
| unit-names | custom unit names | false | { day: string, hour: string, minute: string, second: string } | { day: 'дн', hour: 'ч', minute: 'мин', second: 'сек' } | any valid object |

## Events

| Name | Description | Arguments |
| --- | --- | --- |
| timer-ends | Fired when timer ends | - |

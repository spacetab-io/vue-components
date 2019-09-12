# Documentation

## Popper props

| Name | Description | Required | Type | Default value | Possible values |
| --- | --- | --- | --- | --- | --- |
| content | popper raw content | false | string | - | - |
| width | popper width | false | number | - | - |
| tag | html tag for root element | false | string | span | - |
| delay-on-mouse-over | delay mouse over on popper in milliseconds | false | number | 100 | - |
| delay-on-mouse-out | delay mouse out of popper in milliseconds | false | number | 100 | - |
| arrow-visible | show or hide arrow | false | boolean | true | - |
| with-border | add border to popper | false | boolean | false | - |
| popper-class | additional popper class | false | string | - | - |
| placement | popover priority placement | false | string | {{DEFAULT_PLACEMENT}} | {{AVAILABLE_PLACEMENTS}} |
| trigger | popper trigger type | false | string | {{DEFAULT_TRIGGER}} | {{AVAILABLE_TRIGGERS}} |
| append-to-body | append popper to body | false | boolean | false | - |
| reference | custom reference html element | false | HTMLElement | - | - |
| stop-propagation | run event.stopPropagation function | false | boolean | false | - |
| preventDefault | run event.preventDefault function | false | boolean | false | - |
| force-show | force show popper | false | boolean | false | - |
| disabled | is popper disabled | false | boolean | false | - |
| boundariesSelector | The element which will define the boundaries of the popper position. The popper will never be placed outside of the defined boundaries | false | string | selector | - |
| enter-active-class | enter transition active class | false | string | - | - |
| leave-active-class | leave transition active class | false | string | - | - |
| transition | transition name | false | string | - | - |


## Popper events

| Name | Description | Contents |
| --- | --- | --- |
| show | Triggered when popper is opened | popper component |
| hide | Triggered when popper is closed | popper component |


## Popper slots

| Name | Description |
| --- | --- |
| default | Popper content slot |
| reference | Popper reference slot. Used if reference prop not passed. |

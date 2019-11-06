# Documentation
This is a container element for popper with some styles and additional functionality.

## Example of Usage
In this component, you have 2 variants of usage.

With raw contents:

```vue
<st-popper raw-content="Your content">
  <div>Your reference in default slot</div>
</st-popper>
```

and like common popper element

```vue
<st-popper>
  <div slot="reference">Your html reference element</div>
  
  <div>Tooltip html content in default slot</div>
</st-popper>
```

## Props

#### Additional tooltip props
| Name | Description | Required | Type | Default value | Possible values |
| --- | --- | --- | --- | --- | --- |
| raw-content | Be care! If you are using this property. The default property becomes a popper reference element. | false | string | - | any string value |
| tag | html tag for root element | false | string | span | - |
| enter-active-class | enter transition active class | false | string | - | - |
| delay-on-mouse-over | delay mouse over on popper in milliseconds | false | number | 100 | - |
| width | popper width | false | number | - | - |
| delay-on-mouse-out | delay mouse out of popper in milliseconds | false | number | 100 | - |
| boundariesSelector | The element which will define the boundaries of the popper position. The popper will never be placed outside of the defined boundaries | false | string | selector | - |
| arrow-visible | show or hide arrow | false | boolean | true | - |
| leave-active-class | leave transition active class | false | string | - | - |
| transition | transition name | false | string | - | - |
| placement | popover priority placement | false | string | auto | auto-start, auto, auto-end, top-start, top, top-end, right-start, right, right-end, bottom-end, bottom, bottom-start, left-end, left, left-start |
| append-to-body | append popper to body | false | boolean | false | - |
| reference | custom reference html element | false | HTMLElement | - | - |
| trigger | popper trigger type | false | string | hover | click, hover, focus, manual |
| stop-propagation | run event.stopPropagation function | false | boolean | false | - |
| prevent-default | run event.preventDefault function | false | boolean | false | - |
| force-show | force show popper | false | boolean | false | - |
| disabled | is popper disabled | false | boolean | false | - |
| with-border | add border to popper | false | boolean | false | - |
| popper-class | additional popper class | false | string | - | - |
| content | popper raw content | false | string | - | - |
| v-model | manual popper trigger | false | boolean | - | - |

## Events

| Name | Description | Contents |
| --- | --- | --- |
| show | Triggered when popper is opened | popper component |
| hide | Triggered when popper is closed | popper component |

## Slots

As we mentioned upper. We have 2 situations.

#### If you are using `raw-content` property.
| Name | Description |
| --- | --- |
| default | Here you can pass your popper reference element. |

#### If you do not use `raw-content` property.
| Name | Description |
| --- | --- |
| default | Here your popper content |
| reference | Here your reference element |

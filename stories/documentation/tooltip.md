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

All popper props. See popper documentation.

#### Additional tooltip props
| Name | Description | Required | Type | Default value | Possible values |
| --- | --- | --- | --- | --- | --- |
| raw-content | Be care! If you are using this property. The default property becomes a popper reference element. | false | string | - | any string value |

## Events
All popper events. ( show / hide )

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

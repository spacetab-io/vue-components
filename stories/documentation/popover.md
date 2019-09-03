# Documentation
Base on [v-tooltip](https://github.com/Akryum/v-tooltip) component

## Attributes

| Name | Description | Required | Type | Default value | Possible values |
| --- | --- | --- | --- | --- | --- |
| open | Boolean that shows or hide the popover | false | Boolean | false | * |
| disabled | Boolean that disables the popover. If it was already open, it will be closed | false | Boolean | false | * |
| placement | ou can specify the tooltip position as a modifier | false | String | top | auto, auto-start, auto-end, top, top-start, top-end, right, right-start, right-end, bottom, bottom_start, bottom-end, left, left-start, left-end |
| delay | Show/Hide delay (ms) | false | Object | { show: 0, hide: 300 } | * |
| trigger | Events triggering the tooltip separated with spaces | false | String | hover focus | hover, focus, click, manual <br> <small>(manual can't be combined with any other event)</small> |
| offset | Offset of the position (px) | false | Number | 0 | * |
| container | Selector: Container where the tooltip will be appended | false | String | body | * |
| boundariesElement | DOM element for the tooltip boundaries | false | HTMLElement | - | * |
| popperOptions | Other [Popper.js](https://popper.js.org) options | false | Object | - | * |
| popoverClass | Classes applied to the popover element. Use this to apply different themes to the popover | false | String | - | * |
| popoverBaseClass | Base classes applied to the popover element (defaults to 'tooltip popover') | false | String | - | * |
| popoverWrapperClass | Class of the element that contains the arrow and inner content | false | String | - | * |
| popoverArrowClass | Class of the arrow element | false | String | - | * |
| popoverInnerClass | Class of the inner content element | false | String | - | * |
| autoHide | Hide the popover if clicked outside | false | Boolean | false | * |
| handleResize | Automatically update the popover position if its size changes | false | Boolean | false | * |
| openGroup | If set, will close all the open popovers that have a different open-group value or unset | false | Boolean | - | * |
| openClass | Class put on the popover when it's open | false | Boolean | - | * |

## Events

| Name | Description |
| --- |  --- |
| update:open | (Boolean) - This allow you to use the `.sync` modifier on the `open` prop. |
| show |  - |
| apply-show | Emitted after the show delay |
| hide | - |
| apply-hide | Emitted after the hide delay |
| dispose | - |
| auto-hide | Emitted when the popover is closed if clicked outside |
| close-directive | Emitted when the popover is closed with the [Close directive](https://github.com/Akryum/v-tooltip#close-directive) |
| close-group | Emitted when the popover is closed because a popover of another `open-group` was shown. |
| resize |  Emitted when the content size changes. You must set the `handleResize` prop to `true` |

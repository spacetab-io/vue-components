# Documentation
Base on [v-tooltip](https://github.com/Akryum/v-tooltip) component

You can use an object instead of a simple string:

`<button v-tooltip.bottom="You have new messages.">`


Or Object:

`<button v-tooltip="{ content: 'You have ' + count + ' new messages.', classes: ['a', 'b'] }">`

## Attributes

| Name | Description | Required | Type | Default value | Possible values |
| --- | --- | --- | --- | --- | --- |
| content | HTML text to be displayed in the tooltip. Can also be a function that returns the content or a Promise | true | String | true | * |
| classes | - | - | String, Array, Object | - | * |
| targetClasses | CSS classes added to the target element of the tooltip | - | String, Array, Object | - | * |
| html | Allow HTML tooltip content | - | Boolean | - | * |
| delay | Show/Hide delay, or object (ms) | - | Number | Object | { show: 500, hide: 100 } |
| placement | ou can specify the tooltip position as a modifier | false | String | top | auto, auto-start, auto-end, top, top-start, top-end, right, right-start, right-end, bottom, bottom_start, bottom-end, left, left-start, left-end |
| trigger | Events triggering the tooltip separated with spaces | false | String | hover focus | hover, focus, click, manual <br> <small>(manual can't be combined with any other event)</small> |
| show | Boolean to manually open or hide the tooltip | - | Boolean | - | * |
| offset | Offset of the position (px) | - | Number | - | * |
| container | Selector: Container where the tooltip will be appended | - | String | - | 'body' |
| boundariesElement | DOM element for the tooltip boundaries | - | DOM element | - | * |
| template | HTML template of the tooltip | - | String | - | * |
| arrowSelector | CSS selector to get the arrow element in the tooltip template | - | String | - | * |
| innerSelector | CSS selector to get the inner content element in the tooltip template | - | String | - | * |
| autoHide | Boolean: automatically close the tooltip on mouseover | - | Boolean | - | * |
| hideOnTargetClick | Boolean: automatically close the tooltip on target click | - | Boolean | - | * |
| loadingClass | CSS classes added to the tooltip when content is loading | - | String, Array, Object | - | * |
| loadingContent | Same as content, used when the actual tooltip content is loading | - | String | - | * |
| popperOptions | Other [Popper.js](https://popper.js.org) options | false | Object | - | * |

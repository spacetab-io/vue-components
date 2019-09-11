# Documentation

## Notification use

Add component to your App.vue (we recommend to place it as a body child)

```html
<st-notifications-group />
```

Call notifications in your code:

```javascript
this.$stNotification({
  message: 'Notification message', // required
  type: 'info',  // not required
  title: 'Notification title', // not required
  closeable: true, // not required
  duration: 4500,  // not required
  icon: 'warning',  // not required
});
```

## Notifications group attributes

| Name | Description | Required | Type | Default value | Possible values |
| --- | --- | --- | --- | --- | --- |
| position | Defines notifications position in window | - | string | bottom-right | top-left / top-center / top-right / bottom-left / bottom-center / bottom-right |


## Notification attributes

| Name | Description | Required | Type | Default value | Possible values |
| --- | --- | --- | --- | --- | --- |
| type | Defines notification's type | - | string | info | info / success / warning / error |
| title | Defines notification's title | - | string | - | * |
| message | Defines notification's message | true | string | - | * |
| closeable | Defines rendering of close button in notification | - | boolean | true | false / true |
| duration | Defines the duration of notification's visibility. 0 means it will not be removed automatically  | - | number | 4500 | * |
| icon | Defines icon near the content. Use name from our component Icon  | - | string | - | CHECK ICON COMPONENT |

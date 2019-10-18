# Documentation

## Example of Usage

```javascript
currentPage = 1;

totalRows = 100;

anyBigDataArray = [
  // a lot of data to paginate
];

currentPageData = [];

onPageChange({ currentPage, perPage, offset }) {
  this.currentPageData = this.anyBigDataArray.slice(offset - perPage, offset);
}
```

```html
<!-- With v-model -->
<st-pagination v-model="currentPage" 
               :total="totalRows" 
               @change:extended="onPageChange" />
               
<!-- Without v-model -->
<st-pagination :current-page="currentPage" 
               :total="totalRows" 
               @change="currentPage = $event" 
               @change:extended="onPageChange" />
```

## Attributes

| Name | Description | Required | Type | Default value | Possible values |
| --- | --- | --- | --- | --- | --- |
| current-page **(v-model)** | Current page | true | number | 1 | - |
| total | Total number of rows | true | number | - | - |
| per-page | Amount of rows per page | false | number | 10 | - |
| grouped-pages | Amount of pages shown together | false | number | 3 | - |
| show-empty | Shows component with a single page | false | boolean | false | - |
| show-boundary | Shows boundary controls | false | boolean | false | - |
| show-step | Shows step controls | false | boolean | true | - |
| prev-step-icon | Prev step icon name | false | string | arrow-left-soft | - |
| next-step-icon | Next step icon name | false | string | arrow-right-soft | - |
| first-page-icon | First page icon name | false | string | arrow-left-long | - |
| last-page-icon | LastPage icon name | false | string | arrow-right-long | - |
| prev-step-label | Prev step label text | false | string | предыдущая | - |
| next-step-label | Next step label text | false | string | следующая | - |
| first-page-label | First page label text | false | string | в начало | - |
| last-page-label | Last page label text | false | string | в конец | - |

## Events

| Name | Description | Arguments |
| --- | --- | --- |
| change | **(v-model)** Triggers on current page change | number |
| change:extended | Triggers on paging data changed | PaginationChangeExtendedEvent |

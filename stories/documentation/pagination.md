# Documentation

## Pagination attributes

| Name | Description | Required | Type | Default value | Possible values |
| --- | --- | --- | --- | --- | --- |
| showEmpty | Shows component with a single page | false | boolean | false | - |
| showBoundary | Shows boundary controls | false | boolean | false | - |
| showStep | Shows step controls | false | boolean | true | - |
| list | Array of items to paginate | true | any[] | [] | - |
| limit | Limit | false | number | 10 | - |
| groupedPages | Amount of pages shown together | false | number | 3 | - |
| initialPage | Current page | false | number | 1 | - |
| prevStepIcon | Prev step icon name | false | string | arrow-left-soft | - |
| nextStepIcon | Next step icon name | false | string | arrow-right-soft | - |
| firstPageIcon | First page icon name | false | string | arrow-left-long | - |
| lastPageIcon | LastPage icon name | false | string | arrow-right-long | - |
| prevStepLabel | Prev step label text | false | string | предыдущая | - |
| nextStepLabel | Next step label text | false | string | следующая | - |
| firstPageLabel | First page label text | false | string | в начало | - |
| lastPageLabel | Last page label text | false | string | в конец | - |

## Pagination events

| Name | Description | Arguments |
| --- | --- | --- |
| change | Triggers on paging data changed | PaginationEvent |

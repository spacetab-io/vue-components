# Documentation

## Table attributes

| Name | Description | Required | Type | Default value | Possible values |
| --- | --- | --- | --- | --- | --- |
| data | Table data | true | Array\<Object\> | - | * |
| columns | Table columns, you can also add `renderHtml: true` on each column object | true | Array\<Object\> (same as `Defining the columns`) | - | * |
| bordered | Border to all cells | false | Boolean | - | * |
| selected | Set which row is selected, use the `.sync` modifier to make it two-way binding | false | Object | - | * |
| sortBy | Sets the sort column and order | false | String | - | * |
| sortDirection | Sets the default sort column direction on the first click | false | String | - | asc, desc |
| clientSorting | Sort table data by client side | false | Boolean | - | * |
| rowClass | Function for cals row class by row and index | false | (row: String, index: Number): String | - | * |
| customRowKey | Property of each row that defines the unique key of each row | false | String | - | index |

## Defining the columns
Let’s take an example of configuring the columns property. We are going to tell StTable that row-key is ‘name’, which must be unique. If this was data fetched from a database we would likely use the row id.

```javascript
columns: [ // array of Objects
  // column Object definition
  {
    // unique id (used by row-key, pagination.sortBy, ...)
    name: 'desc',

    // label for header
    label: 'Dessert (100g serving)',

    // row Object property to determine value for this column
    field: 'name',
    // OR field: row => row.some.nested.prop

    // (optional) tell ЫеTable you want this column sortable
    sortable: true,

    // (optional) compare function if you have
    // some custom data or want a specific way to compare two rows
    sort: (a, b, rowA, rowB, direction) => parseInt(a, 10) - parseInt(b, 10)

    width: 100, // 20%

    // Centered content in column
    centered: true,

    // Render as html content
    renderHtml: true,

    // if using scoped slots, apply this yourself instead
    style: 'width: 500px',

    class: 'my-special-class'
  },
]
```

## Events

| Name | Description |
| --- | --- |
| sort | Emitted 2 values `({ sortBy, direction }: SortEvent, col: Column)` when clicked sortable header |
| click | Emitted `row` data when clicked on any row |
| select | Emitted 2 values `(row: Column, selected: boolean)` data when clicked on not selected row |
| update:selected | Emitted `row: Column` data when clicked on not selected row |

## Slots

| Name | scope | Description |
| --- | --- | --- |
| th-{name} | col, index | Table custom header |
| td-{name} | row, col, value, index | Table custom cell |
| empty | - | Replaces table body when data array prop is empty |
| footer | - | Table custom footer |

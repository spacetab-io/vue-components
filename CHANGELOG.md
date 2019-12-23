# Changelog

## 0.2.11
### Maintenance
* changed default suffix icon size from 18px to 12px
* fixed clear-icon-as-suffix-icon in storybook

## 0.2.10

### Features
* Added `placeholder`, `prefix-icon` and `suffix-icon` props to `Datepicker`
* `Button` style `display` changed to `flex` to align inner items
* `Dropdown` `popperProps` prop was removed, new props were added. Check component's documentation
* Added new feature to `Autocomplete`: if no suggestion was selected query will be cleared
* Update theme `Offers` for `Collapser` and `Autocomplete`
* Fix client sorting in `Table` component
* Added `hiddenListClass` prop and `control` slot to `Tabs`

### Maintenance
* Added `closeDropdown` and `openDropdown` to the main `Select` script. There was a problem with no able to open/close it
* Fixed dropdown's visibility in `Autocomplete`'s popper show/hide methods
* `Input`'s prop `focusAfterClear` was set to false as default
* Fixed bug in `Pagination` with displaying pages when `grouped-pages` amount is more than it possible to display
* Removed click event on `Pagination`'s separators    




## 0.2.9

### Features
* Added new component: `Autocomplete`
* Added new components: `Dropdown` and `Dropdown-option`
* Added `dropdown-top` and `dropdown-bottom` slots to `Select` component
* Added `maxHeight` prop to `Popper` component
* Component `Tabs` changes:
    - Added `disable` prop
    - Component was rewrote, some class names were changed. Styling became more easier. Now there're two classes for inner `Tab`: `st-tabs__list-tab` for visible list and `st-tabs__popper-tab` for popper list.
* Component `Input` changes:
    - Added `focusState` prop
    - Inner content was restyles from `absolute` positioning to `flex`
    - Added `default` slot (if you want to place there anything)
* Component `Select` changes:
    - Inner custom input element was replaced with `Input` component
    - Some style variables were removed, some were changed to `Input`'s variables
    - Added `closeOnClear` prop
    - Added `closeOnSelect` prop
    - Added `clearIconAsSuffixIcon` prop
* Component `Popper` changes:
    - Added document listener to usage when `trigger` property's value is `manual`
    - `documentClick` event was renamed to `document-click`
    - Added popper arrow's shadow

### Maintenance
* `Select` component fixes:
    - Fixed dropdown's bug with list overflowing
    - Fixed inner popper's behavior when there're some `Select` components on the page
* Fixed `Scrollbar`'s overflow-x property when horizontal scroll is hidden
* `Input` component fixes:
    - Fixed wrong background color when disabled
    - Fixed clear icon visibility when disabled or readonly
    - Removed Firefox's outline when inner input is `:invalid`
* Added `Slots` section to documentation template file
* Fixed bug with disabled collapsed tabs in `Tabs` component




## 0.2.8

### Features
* Added browser notifications to `Notifications` component
* Components `Tabs` and `Tabs-collapsed` were rewrote and combined into single component `Tabs`.
Since now if you want use Tabs with collapser inside then use property `collapsed`.




## 0.2.7

### Features
* `Input` component changes:
    - Inner elements were moved into flex alignment
    - Added keydown/keyup/keypress handlers
* Added component `Circular Countdown`

### Maintenance
* `Scrollbar`'s tracking was updated
* `Popper` component's changes:
    - Fixed body appending bug
    - Background color was updated
    - Fixed disaled state
* Default background variable's color was changed (`$st-background-color`)
* `Dialog` component's types were updated




## 0.2.6

### Features
* Added `minimumScrollSize` prop for component `Scrollbar`
* Added component `Dialog`
* Added component `Tooltip`
* Added component `Datepicker`
* Added new libraries in project dependencies:
    - `tingle.js`
    - `moment.js`

### Maintenance
* Storybook components pages update:
    - Added documentation for `Button` component
    - Text and With-Icon pages of `Button` were removed
    - Added `disabled` prop to `Popover`'s page
* Lodash types were fixed
* Popover's bug with type of `reference` prop was fixed
* `Scrollbar`'s bug with cursor floating on mouse move was fixed
* Fixed `Button-group`'s last child styles




## 0.2.5

### Features
* Fixed storybook and some logic of `Popper` component
* Added `indeterminate` prop for component `Checkbox`
* Added `id` prop for component `Checkbox`
* Improved view of `Collapser` component
* `Pagination` component was updated:
    * Prop `limit` was renamed to `perPage`
    * Prop `list` was changed to `total`
    * Prop `initialPage` was renamed to `currentPage` and now it uses for **v-model**
    * Interface `PaginationEvent` was renamed to `PaginationChangeExtendedEvent`
    * Pages with big numbers (for example 1000) displays correctly now
    * Calculating pages for group (`groupedPages`) works correctly now

### Maintenance
* Weird mixins and functions in scss files were removed




## 0.2.4

### Features
* Added new component: `Select`
* Added new component: `Tabs`
* Added new component: `Collapser`
* Added `PopperBindProperties` interface for component `Popper`
* Added `readonly` prop for component `Checkbox`

### Maintenance
* Added pre-commit script
* EOL symbol in generators was updated




## 0.2.3

### Features
* Added new component: `Popper`
* Added new icons: Return, Luggage, No-Return, No-Luggage




## 0.2.2

### Features
* `Popover` component was temporarily disabled

### Maintenance
* Lint dependencies were updated




## 0.2.1

### Features
* Added `Radio` component to `Offers` theme
* Added new component: `Switch`
* Added new component: `Notifications`
* Added new component: `Scrollbar`
* Added new component: `Pagination`
* Added new component: `Popover`
* Added new component: `Badge`

### Maintenance
* Fixed `Offers` theme for `Button` component
* Fixed `Checkbox` value type
* Added components generator. If you are about to make a new component just run `npm run generator:component` and follow the instructions.
* Prepared for publishing
* Linter dependencies were updated




## 0.1.2

### Dependencies
* Package `awesome-typescript-loader` was replaced to `ts-loader`

### Features

* Added `Offers` theme styles for `Checkbox`, `Input` and `Textarea` components

### Maintenance

* Fixed styles for `cancel` and `remove` types for `Button`
* Icon generator was moved from `config` to `build` directory
* Generated icons files were renamed:
    * `icons.json` to `_icons.generated.json` at `src/assets/icons`
    * `src/utils/icons.ts` to `src/components/icon/_icons.generated.ts`
* All icons' symbol ids have got prefix `st-`
* Added theme generator. Since now you can build your theme's files - use `npm run generator:themes`.




## 0.1.1

### Breaking Changes
* Changed theme system. Check documentation at "Customization" section.

### Features
* Added new theme: `Offers`
* Added new component: `Checkbox`
* Added new components: `Input`, `Textarea`

### Maintenance
* Changed CLI scripts at `package.json`
    * `npm run storybook:serve` renamed to `npm run serve`
    * `npm run storybook:build` renamed to `npm run build`

# Changelog

## 0.2.17




## 0.2.16

### Features
* Added new icons: `square-go-to`, `circle-go-to`
* Added `innerId` prop to `Input`
* Added modifier-classes `hovered`, `focused` to `Checkbox`
* Component `Datepicker` changes:
  - Added `close`, `blur`, `focus`, `open` methods
  - Added `closeOnPick` prop
  - Added emitting `blur` event when `Datepicker`'s inner input do `blur`
  - Added slot `reference` (to use different things instead of inner input)
* Component `Radio` changes:
  - Realization was changed from simple `div` to native `input[type=radio]`
  - Added `readonly`, `id`, `name` props
  - Added modifier-classes `hovered`, `focused`
* Added emitting `keypress`, `keyup`, `keydown` to `Textarea`

### Maintenance
* Fixed `Datepicker` bug with disappearing year grid when it has `extended` `navigation-type`




## 0.2.15

### Features
* Added `Validation` for `Select`, `Autocomplete`
* Added `NotEmptyArrayRule` rule for `Validation`
* Added `prefix` and `suffix` slots for `Autocomplete`

### Maintenance
* Fixed `Input`'s align problem in Safari and Mozilla




## 0.2.14

### Features
* Added `prevent-input` prop to `Input`.
* Added `header-style` prop to Column of `Table` component for styling header cell in table
* Added `focus` and `blur` methods to `Input` and `Autocomplete`
* Added `useReferenceWidth` option to storybook of `Autocomplete`

### Maintenance
* Fixed weird bug when typing in Select leaded to displaying clear icon
* Fixed `Select` arrow visibility when component is non-clearable
* Fixed bug with `useReferenceWidth` do not work properly in `Dropdown`
* Fixed checkbox height (container of checkbox's square was a bit higher)
* Fixed multiple `Select`'s selected options update. There was a problem with displaying of collapser's items when `Select`'s value was changed from outside
* Created `BaseSelectValue`, `SingleSelectValue`, and `MultipleSelectValue` types for `Select` prop `value`




## 0.2.13

### Features
* Added `no-options-message` slot to `Select`. If there're no options to display that slot will be visible

### Maintenance
* Fixed bug with not defined immediate watch value of validatable components.




## 0.2.12

### Features
* `Select`'s prop `clearIconAsSuffixIcon` was renamed to `clearIconAsArrowIcon`. Also a new prop `showArrowIcon` was added.
Now you can set a suffix-icon near the default arrow icon
* Added `text-align` with default value `center` to multiple `Select`'s collapser dropdown
* Created validation functionality. Additional info you can find in storybook validation notes.
* Created `NotEmptyRule` `LengthInRange` `PassRegexpRule` rules for validation.
* Added validation for `Input`
* Added `optionClass` prop to `Select`
* Added `size` prop to `Autocomplete` and `Select`
* `Dropdown` placement was changed from `bottom` to `bottom-start`. Same in `Autocomplete` and `Select` components

### Maintenance
* Updated `Notification` component. Do not show browser notifications when window is active
* Fixed `Select`'s `list` slot. Didn't work before
* Added `selected` key to `Select`'s `options` object. Useful for `option` slot
* Fixed `Popper` bug with placement while `useReferenceWidth` is on
* `Input` and `Notification` icons with padding set to `box-sizing: content-box`. Padding won't be calculated in width and height
* Fixed bug with setting `popperClass` at `dropdownProps` in `Select` and `Autocomplete` components
* Fixed server sorting in `Table` component
* `Scrollbar`'s caret containers was updated with z-index
* Fixed `Input`'s icon sizes with different value of `size` prop
* Fixed `Dropdown` documentation page




## 0.2.11

### Features
* `Autocomplete` prop `popperProps` was renamed to `dropdownProps`
* Added max-width css property to `Autocomplete`'s popper
* `Select` prop `dropdownPopperProps` was renamed to `dropdownProps`
* `Select` and `Autocomplete` css style `width: 100%` was removed (in cause of popper displaying bug)
* Added `Dropdown`'s prop `useReferenceWidth` to make dropdown's width same as its reference
* `Dropdown`'s prop `appendToBody` was set to `true`
* `Input`'s `clearable` prop behaviour was changed a bit: if you set it `true` component will be clearable all the time.
For cases when it's `readonly` or `disabled` check documentation

### Maintenance
* Updated `Input` documentation
* Fixed clear-icon-as-suffix-icon in storybook




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

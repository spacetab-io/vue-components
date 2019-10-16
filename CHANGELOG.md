# Changelog

## 0.2.5

### Features
* `Pagination` component was improved:
    * Prop `limit` was renamed to `perPage`
    * Prop `list` was changed to `total`
    * Prop `initialPage` was renamed to `currentPage` and now it uses for **v-model**
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

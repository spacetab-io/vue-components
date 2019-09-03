# Changelog

## 0.2.0

### Maintenance
* Fixed `Offers` theme for `Button` component
* Added `Radio` component to `Offers` theme
* Fixed `Checkbox` value type 

### Features
* Added `Scrollbar` component



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

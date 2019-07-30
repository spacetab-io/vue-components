/* eslint-disable import/no-extraneous-dependencies */
import {
  configure,
  addDecorator,
  addParameters,
} from '@storybook/vue';
import { withKnobs } from '@storybook/addon-knobs';
import { spacetabTheme } from './spacetab-theme';

function loadStories() {
  const defaultStories = require.context('../stories', true, /.stories.js$/);
  const exampleThemeStories = require.context(
    '../stories/themes/example/',
    true,
    /.stories.js$/,
  );
  requireStories(defaultStories);
  requireStories(exampleThemeStories);
}
function requireStories(stories) {
  stories.keys().forEach(filename => stories(filename));
}

addParameters({
  options: {
    name: 'spacetab.io',
    url: '#',
    theme: spacetabTheme,
    addonPanelInRight: true,
  },
});
addDecorator(withKnobs);
configure(loadStories, module);


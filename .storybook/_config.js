/* eslint-disable import/no-extraneous-dependencies */
import {
  configure,
  addDecorator,
  addParameters,
} from '@storybook/vue3';
import { withKnobs } from '@storybook/addon-knobs';
import { spacetabTheme } from './spacetab-theme';

function loadStories() {
  const stories = require.context('../stories', true, /.stories.js$/);
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


import { storiesOf } from '@storybook/vue3';
import { template } from '../../templates/about/changelog.template';
import rootChangelog from '../../../CHANGELOG.md';

const customizationStoriesOf = storiesOf('UI|About', module);

customizationStoriesOf.add(
  'Changelog',
  () => ({ template }),
  {
    notes: { markdown: rootChangelog },
  },
);

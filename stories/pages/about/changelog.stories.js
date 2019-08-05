import { storiesOf } from '@storybook/vue';
import { template } from '../../templates/about/changelog.template';

const customizationStoriesOf = storiesOf('UI|About', module);

customizationStoriesOf.add('Changelog', () => ({ template }));

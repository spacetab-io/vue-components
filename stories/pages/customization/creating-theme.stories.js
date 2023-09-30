import { storiesOf } from '@storybook/vue3';
import { template } from '../../templates/customization/creating-theme.template';

const customizationStoriesOf = storiesOf('UI|Customization', module);

customizationStoriesOf.add('Creating a theme', () => ({ template }));

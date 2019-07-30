import { storiesOf } from '@storybook/vue';
import { template } from '../../templates/customization/customization-in-your-project.template';

const customizationStoriesOf = storiesOf('UI|Customization', module);

customizationStoriesOf.add('Customization in your project', () => ({ template }));

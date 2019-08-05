import { storiesOf } from '@storybook/vue';
import { template } from '../../templates/customization/creating-components.template';

const customizationStoriesOf = storiesOf('UI|Customization', module);

customizationStoriesOf.add('Creating components', () => ({ template }));

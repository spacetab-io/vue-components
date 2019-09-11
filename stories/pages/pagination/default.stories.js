import { storiesOf } from '@storybook/vue'
import {
  boolean,
  text,
  array,
  number
} from '@storybook/addon-knobs';
import { template } from '../../templates/pagination/default.template';
import notes from '../../documentation/pagination.md'

storiesOf('Components|Pagination', module).add('Default', () => ({
  template,
  props: {
    size: {
      default: number('Limit', 1),
    },
    listSize: {
      default: number('List size', 15),
    },
    pageNumber: {
      default: number('Page number', 1),
    },
    groupSize: {
      default: number('Grouped page length', 3),
    },
    showEmpty: {
      default: boolean('Show when empty', false),
    },
    showBoundary: {
      default: boolean('Show boundary controls', false),
    },
    showStep: {
      default: boolean('Show step controls', true),
    },
    prevStepIcon: {
      default: text('prevStepIcon', 'arrow-left-soft'),
    },
    nextStepIcon: {
      default: text('nextStepIcon', 'arrow-right-soft'),
    },
    firstPageIcon: {
      default: text('firstPageIcon', 'arrow-left-long'),
    },
    lastPageIcon: {
      default: text('lastPageIcon', 'arrow-right-long'),
    },
    prevStepLabel: {
      default: text('prevStepLabel', 'предыдущая'),
    },
    nextStepLabel: {
      default: text('nextStepLabel', 'следующая'),
    },
    firstPageLabel: {
      default: text('firstPageLabel', 'в начало'),
    },
    lastPageLabel: {
      default: text('lastPageLabel', 'в конец'),
    },
  },
  computed: {
    list() {
      return new Array(this.listSize);
    },
  },
}), {
  notes,
});

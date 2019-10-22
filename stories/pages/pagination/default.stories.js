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
    perPage: {
      default: number('per-page', 5),
    },
    total: {
      default: number('total', 20),
    },
    groupedPages: {
      default: number('grouped-pages', 3),
    },
    showEmpty: {
      default: boolean('show-empty', false),
    },
    showBoundary: {
      default: boolean('show-boundary', false),
    },
    showStep: {
      default: boolean('show-step', true),
    },
    prevStepIcon: {
      default: text('prev-step-icon', 'arrow-left-soft'),
    },
    nextStepIcon: {
      default: text('next-step-icon', 'arrow-right-soft'),
    },
    firstPageIcon: {
      default: text('first-page-icon', 'arrow-left-long'),
    },
    lastPageIcon: {
      default: text('last-page-icon', 'arrow-right-long'),
    },
    prevStepLabel: {
      default: text('prev-step-label', 'предыдущая'),
    },
    nextStepLabel: {
      default: text('next-step-label', 'следующая'),
    },
    firstPageLabel: {
      default: text('first-page-label', 'в начало'),
    },
    lastPageLabel: {
      default: text('last-page-label', 'в конец'),
    },
  },
  computed: {
    rows() {
      return new Array(this.total)
        .fill(null)
        .map((item, index) => this.createRow(index + 1));
    },
  },
  data() {
    return {
      currentPage: 1,
      showAllData: false,
      showPageData: true,
      currentPageData: [],
      defaultRow: {
        number: 0,
        anyData: 'anyValue',
      }
    }
  },
  mounted() {
    this.setCurrentPageData(0, this.perPage);
  },
  methods: {
    createRow(number) {
      return {
        ...this.defaultRow,
        number,
      }
    },
    setCurrentPageData(from, amount) {
      this.currentPageData = this.rows.slice(from, amount);
    },
    onPageSelect(data) {
      this.setCurrentPageData(data.offset - data.perPage, data.offset);
    },
  }
}), {
  notes,
});

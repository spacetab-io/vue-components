import {
  Component,
  Model,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';

import StIcon from '../icon/index.vue';
import { PaginationChangeExtendedEvent } from './types';


enum PageType {
  page,
  separator,
}

interface Page {
  type: PageType;
  number?: number;
}

interface RangeOptions {
  hasFirstSeparator: boolean;
  hasLastSeparator: boolean;
  minRange: number;
  maxRange: number;
}

const ELLIPSIS_ELEMENTS_LIMIT = 3; // page + ellipsis + page

@Component({
  name: 'StPagination',
  components: {
    StIcon,
  },
})
export default class StPagination extends Vue {
  @Model('change', { type: Number, required: true, default: 1 })
  currentPage!: number;

  @Prop(Number)
  total!: number;

  @Prop({ type: Number, default: 10 })
  perPage!: number;

  @Prop({ type: Number, default: 3 })
  groupedPages!: number;

  @Prop(Boolean)
  showEmpty!: boolean;

  @Prop(Boolean)
  showBoundary!: boolean;

  @Prop({ type: Boolean, default: true })
  showStep!: boolean;

  @Prop({ type: String, default: 'arrow-left-soft' })
  prevStepIcon!: string;

  @Prop({ type: String, default: 'arrow-right-soft' })
  nextStepIcon!: string;

  @Prop({ type: String, default: 'arrow-left-long' })
  firstPageIcon!: string;

  @Prop({ type: String, default: 'arrow-right-long' })
  lastPageIcon!: string;

  @Prop({ type: String, default: 'предыдущая' })
  prevStepLabel!: string;

  @Prop({ type: String, default: 'следующая' })
  nextStepLabel!: string;

  @Prop({ type: String, default: 'в начало' })
  firstPageLabel!: string;

  @Prop({ type: String, default: 'в конец' })
  lastPageLabel!: string;

  PageType: object = PageType;

  totalPages: number = 0;

  pages: Page[] = [];

  get isPaginationHidden(): boolean {
    return !this.showEmpty && this.totalPages <= 1;
  }

  get rangeOptions(): RangeOptions {
    const pagesOffset = Math.floor((this.groupedPages - 1) / 2);
    const boundaryVisibleElementsAmount = ELLIPSIS_ELEMENTS_LIMIT + (pagesOffset * 2);

    const boundarySecondFirstPage = 2;
    const boundarySecondLastPage = this.totalPages - 1;

    const firstBoundarySplit = Math.min(
      boundarySecondLastPage,
      boundaryVisibleElementsAmount,
    );
    const lastBoundarySplit = Math.max(
      boundarySecondFirstPage,
      this.totalPages - boundaryVisibleElementsAmount + 1,
    );

    const separatedMinRange = this.currentPage - pagesOffset;
    const separatedMaxRange = this.currentPage + pagesOffset;

    const needSeparators = firstBoundarySplit <= lastBoundarySplit + pagesOffset;
    const hasFirstSeparator = needSeparators
      ? separatedMinRange - ELLIPSIS_ELEMENTS_LIMIT >= 1
      : false;
    const hasLastSeparator = needSeparators
      ? separatedMaxRange + ELLIPSIS_ELEMENTS_LIMIT <= this.totalPages
      : false;

    let minRange = separatedMinRange;
    let maxRange = separatedMaxRange;
    if (!hasFirstSeparator || !hasLastSeparator) {
      const minRangeWithSeparator = this.currentPage > lastBoundarySplit
        ? lastBoundarySplit
        : separatedMinRange;
      const minRangeWithoutSeparator = this.currentPage > lastBoundarySplit
        ? lastBoundarySplit
        : boundarySecondFirstPage;
      const maxRangeWithSeparator = this.currentPage < firstBoundarySplit
        ? firstBoundarySplit
        : separatedMaxRange;

      minRange = hasFirstSeparator ? minRangeWithSeparator : minRangeWithoutSeparator;
      maxRange = hasLastSeparator ? maxRangeWithSeparator : boundarySecondLastPage;
    }

    return {
      hasFirstSeparator,
      hasLastSeparator,
      minRange,
      maxRange,
    };
  }

  @Watch('groupedPages')
  onGroupedPagesChange(): void {
    this.setPages();
  }

  @Watch('currentPage')
  onCurrentPageChange(): void {
    this.setPages();
    this.emitChangeExtended();
  }

  @Watch('total', { immediate: true })
  onListChange(): void {
    this.setTotalPages();
    this.setPages();
  }

  @Watch('perPage')
  onPerPageChange(): void {
    this.setTotalPages();
    if (this.currentPage === 1) {
      this.emitChangeExtended();
    }
    this.updateCurrentPage(1);
    this.setPages();
  }

  setTotalPages(): void {
    this.totalPages = Math.ceil(this.total / this.perPage);
  }

  setPages(): void {
    const pages: Page[] = [];
    const {
      hasFirstSeparator,
      hasLastSeparator,
      minRange,
      maxRange,
    } = this.rangeOptions;
    const isRangeValid = maxRange - minRange > -1;

    pages.push({
      type: PageType.page,
      number: 1,
    });

    if (hasFirstSeparator) {
      pages.push({
        type: PageType.separator,
        number: 2,
      });
    }

    if (isRangeValid) {
      let pageNumber = minRange;
      while (pageNumber <= maxRange) {
        pages.push({
          type: PageType.page,
          number: pageNumber,
        });
        pageNumber++;
      }
    }

    if (hasLastSeparator) {
      pages.push({
        type: PageType.separator,
        number: this.totalPages - 1,
      });
    }

    if (this.totalPages > 1) {
      pages.push({
        type: PageType.page,
        number: this.totalPages,
      });
    }

    this.pages = pages;
  }

  onFirstClick(): void {
    this.onPageClick(1);
  }

  onLastClick(): void {
    this.onPageClick(this.totalPages);
  }

  onPrevClick(): void {
    this.onPageClick(this.currentPage - 1);
  }

  onNextClick(): void {
    this.onPageClick(this.currentPage + 1);
  }

  onPageClick(page: number): void {
    if (page === 0 || page > this.totalPages) return;
    this.updateCurrentPage(page);
  }

  updateCurrentPage(pageNumber: number): void {
    this.$emit('change', pageNumber);
  }

  emitChangeExtended(): void {
    const extendedEvent: PaginationChangeExtendedEvent = {
      currentPage: this.currentPage,
      perPage: this.perPage,
      offset: this.currentPage * this.perPage,
    };
    this.$emit('change:extended', extendedEvent);
  }
}

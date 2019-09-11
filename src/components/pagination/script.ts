import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';

import StIcon from '../icon/index.vue';
import { PaginationEvent } from './types';


enum PageType {
  page,
  seperator,
}

interface Page {
  type: PageType;
  number?: number;
}

@Component({
  name: 'StPagination',
  components: {
    StIcon,
  },
})
export default class StPagination extends Vue {
  @Prop(Boolean)
  showEmpty!: boolean;

  @Prop(Boolean)
  showBoundary!: boolean;

  @Prop({ type: Boolean, default: true })
  showStep!: boolean;

  @Prop({ type: Array, default: [] })
  list!: any[];

  @Prop({ type: Number, default: 10 })
  limit!: number;

  @Prop({ type: Number, default: 3 })
  groupedPages!: number;

  @Prop({ type: Number, default: 1 })
  initialPage!: number;

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

  currentPage: number = 0;

  pages: Page[] = [];

  get isPaginationHidden(): boolean {
    return !this.showEmpty && this.totalPages <= 1;
  }

  @Watch('groupedPages')
  onGroupedPagesChange(): void {
    this.setPages();
  }

  @Watch('initialPage')
  onInitialPageChange(): void {
    this.currentPage = this.initialPage;
    this.setPages();
  }

  @Watch('list', { immediate: true })
  onListChange(): void {
    this.setTotal();
    this.currentPage = this.initialPage;
    this.setPages();
  }

  @Watch('limit')
  onLimitChange(): void {
    this.setTotal();
    this.currentPage = 1;
    this.setPages();
  }

  setTotal(): void {
    this.totalPages = Math.ceil(this.list.length / this.limit);
  }

  setPages(): void {
    const pages: Page[] = [];

    const offset = Math.floor((this.groupedPages - 1) / 2);
    const hasFirstSeperator = this.currentPage - offset - 3 >= 1;
    const hasLastSeperator = this.currentPage + offset + 3 <= this.totalPages;
    let minRange = hasFirstSeperator ? this.currentPage - offset : 2;
    const maxRange = hasLastSeperator ? this.currentPage + offset : this.totalPages - 1;
    const hasRange = maxRange - minRange > -1;

    pages.push({
      type: PageType.page,
      number: 1,
    });

    if (hasFirstSeperator) {
      pages.push({
        type: PageType.seperator,
        number: 2,
      });
    }

    if (hasRange) {
      while (minRange <= maxRange) {
        pages.push({
          type: PageType.page,
          number: minRange,
        });
        minRange++;
      }
    }

    if (hasLastSeperator) {
      pages.push({
        type: PageType.seperator,
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
    this.currentPage = page;
    const event: PaginationEvent = {
      page: this.currentPage,
      offset: this.currentPage * this.limit,
      limit: this.limit,
    };
    this.$emit('change', event);
    this.setPages();
  }
}

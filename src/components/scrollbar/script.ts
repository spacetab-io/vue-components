/* eslint-disable no-param-reassign */
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';

interface ScrollParameters {
  contentSize: number,
  scrollSize: number,
  scrollPositionPercent: number,
  scrollContainerSize: number,
  dragStart: number,
  isDrag: boolean,
  isVisible: boolean,
}


@Component({
  name: 'StScrollbar',
})
export default class StScrollbar extends Vue {
  @Prop({ type: Number, default: 40 })
  minimumScrollSize!: number;

  public verticalScrollData: ScrollParameters = {
    contentSize: 0,
    scrollSize: 0,
    scrollPositionPercent: 0,
    scrollContainerSize: 0,
    dragStart: 0,
    isDrag: false,
    isVisible: false,
  };

  public horizontalScrollData: ScrollParameters = {
    contentSize: 0,
    scrollSize: 0,
    scrollPositionPercent: 0,
    scrollContainerSize: 0,
    dragStart: 0,
    isDrag: false,
    isVisible: false,
  };

  public verticalScrollbarSize: number = 0;

  public horizontalScrollbarSize: number = 0;

  beforeMount() {
    const div = document.createElement('div');

    div.style.overflow = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';

    document.body.append(div);

    this.verticalScrollbarSize = div.offsetWidth - div.clientWidth;
    this.horizontalScrollbarSize = div.offsetHeight - div.clientHeight;

    div.remove();
  }

  mounted() {
    this.recalculateData();

    this.contentContainer.addEventListener('scroll', this.recalculateScrollPosition);
    this.verticalScroll.addEventListener('mousedown', this.onVerticalMouseDown);
    this.horizontalScroll.addEventListener('mousedown', this.onHorizontalMouseDown);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('resize', this.recalculateData);
  }

  public recalculateData() {
    this.verticalScrollData.isVisible = this.contentContainer.scrollHeight > this.root.scrollHeight;
    this.horizontalScrollData.isVisible = this.contentContainer.scrollWidth > this.root.scrollWidth;

    this.verticalScrollData.contentSize = this.contentContainer.scrollHeight;
    this.verticalScrollData.scrollContainerSize = this.verticalScrollContainer.clientHeight;
    this.verticalScrollData.scrollSize = this.getScrollSize(
      this.verticalScrollData.scrollContainerSize,
      this.verticalScrollData.contentSize,
    );

    this.horizontalScrollData.contentSize = this.contentContainer.scrollWidth;
    this.horizontalScrollData.scrollContainerSize = this.horizontalScrollContainer.clientWidth;
    this.horizontalScrollData.scrollSize = this.getScrollSize(
      this.horizontalScrollData.scrollContainerSize,
      this.horizontalScrollData.contentSize,
    );
  }

  public getScrollSize(containerSize: number, contentSize: number) {
    const size = containerSize * containerSize / contentSize;
    return size > this.minimumScrollSize ? size : this.minimumScrollSize;
  }

  public recalculateScrollPosition() {
    const container = (this.$refs.container as Element);

    this.verticalScrollData.scrollContainerSize = this.verticalScrollContainer.clientHeight;
    this.verticalScrollData.scrollPositionPercent = (
      container.scrollTop / (container.scrollHeight - container.clientHeight)
    ) * 100;

    this.horizontalScrollData.scrollContainerSize = this.horizontalScrollContainer.clientWidth;
    this.horizontalScrollData.scrollPositionPercent = (
      container.scrollLeft / (container.scrollWidth - container.clientWidth)
    ) * 100;
  }

  public onScrollContainerClicked(event: MouseEvent, isVertical: boolean = true) {
    const isHovered = this.isScrollHovered(event, isVertical);

    if (isHovered) {
      return;
    }

    if (isVertical) {
      if (this.verticalScroll.getBoundingClientRect().top > event.clientY) {
        this.verticalPageUp();
        return;
      }
      this.verticalPageDown();
      return;
    }

    if (this.horizontalScroll.getBoundingClientRect().left > event.clientX) {
      this.horizontalPageUp();
      return;
    }

    this.horizontalPageDown();
  }

  public verticalPageUp() {
    this.contentContainer.scrollTo({
      top: Math.max(
        this.contentContainer.scrollTop - this.contentContainer.clientHeight,
        0,
      ),
    });
  }

  public verticalPageDown() {
    this.contentContainer.scrollTo({
      top: Math.min(
        this.contentContainer.scrollTop + this.contentContainer.clientHeight,
        this.contentContainer.scrollHeight - this.contentContainer.clientHeight,
      ),
    });
  }

  public horizontalPageUp() {
    this.contentContainer.scrollTo({
      left: Math.max(
        this.contentContainer.scrollLeft - this.contentContainer.clientWidth,
        0,
      ),
    });
  }

  public horizontalPageDown() {
    this.contentContainer.scrollTo({
      left: Math.min(
        this.contentContainer.scrollTop + this.contentContainer.clientHeight,
        this.contentContainer.scrollHeight - this.contentContainer.clientHeight,
      ),
    });
  }

  public onVerticalMouseDown(event: MouseEvent) {
    this.verticalScrollData.isDrag = true;
    this.verticalScrollData.dragStart = event.offsetY;
  }

  public onHorizontalMouseDown(event: MouseEvent) {
    this.horizontalScrollData.isDrag = true;
    this.horizontalScrollData.dragStart = event.offsetX;
  }

  public onMouseMove(event: MouseEvent) {
    if (this.verticalScrollData.isDrag) {
      event.cancelBubble = true;
      event.returnValue = false;

      const scrollTo = this.calculateScrollTo(
        true,
        event.clientY,
        this.verticalScrollContainer.getBoundingClientRect().top,
        this.verticalScrollContainer.getBoundingClientRect().bottom,
        this.contentContainer.scrollHeight,
        this.verticalScrollData.scrollContainerSize,
        this.verticalScrollData.scrollSize,
        this.verticalScrollData.dragStart,
      );
      this.contentContainer.scroll(scrollTo);
      return;
    }

    if (this.horizontalScrollData.isDrag) {
      event.cancelBubble = true;
      event.returnValue = false;

      const scrollTo = this.calculateScrollTo(
        false,
        event.clientX,
        this.horizontalScrollContainer.getBoundingClientRect().left,
        this.horizontalScrollContainer.getBoundingClientRect().right,
        this.contentContainer.scrollWidth,
        this.horizontalScrollData.scrollContainerSize,
        this.horizontalScrollData.scrollSize,
        this.horizontalScrollData.dragStart,
      );
      this.contentContainer.scroll(scrollTo);
    }
  }

  public calculateScrollTo(
    vertical: boolean,
    currentPosition: number,
    minCursorPosition: number,
    maxCursorPosition: number,
    contentScrollSize: number,
    scrollContainerSize: number,
    scrollSize: number,
    cursorOffset: number,
  ): ScrollToOptions {
    const positionKey = vertical ? 'top' : 'left';

    if (currentPosition < minCursorPosition) {
      return {
        [positionKey]: 0,
      };
    }

    if (currentPosition > maxCursorPosition) {
      return {
        [positionKey]: contentScrollSize,
      };
    }

    const contentPercentPixels = contentScrollSize / 100;
    const availableScrollContainerSize = scrollContainerSize - scrollSize;

    const topLimit = minCursorPosition + cursorOffset;
    const bottomLimit = maxCursorPosition - (scrollSize - cursorOffset);

    let scrolledScrollContainerPixels = Math.max(0, currentPosition - topLimit);
    scrolledScrollContainerPixels = Math.min(bottomLimit - topLimit, scrolledScrollContainerPixels);

    const scrolledScrollContainerPercents = scrolledScrollContainerPixels / (availableScrollContainerSize / 100);

    return {
      [positionKey]: contentPercentPixels * scrolledScrollContainerPercents,
    };
  }

  public onMouseUp() {
    if (this.verticalScrollData.isDrag) {
      this.verticalScrollData.isDrag = false;
      this.verticalScrollData.dragStart = 0;
      return;
    }

    if (this.horizontalScrollData.isDrag) {
      this.horizontalScrollData.isDrag = false;
      this.horizontalScrollData.dragStart = 0;
    }
  }

  public isScrollHovered(event: MouseEvent, vertical: boolean = true) {
    if (vertical) {
      const {
        left, top, right, bottom,
      } = this.verticalScroll.getBoundingClientRect();
      return (
        event.clientX >= left
          && event.clientX <= right
          && event.clientY >= top
          && event.clientY <= bottom
      );
    }
    const {
      left, top, right, bottom,
    } = this.horizontalScroll.getBoundingClientRect();
    return (
      event.clientX >= left
        && event.clientX <= right
        && event.clientY >= top
        && event.clientY <= bottom
    );
  }

  get verticalScroll(): HTMLElement {
    return this.$refs.verticalScroll as HTMLElement;
  }

  get horizontalScroll(): HTMLElement {
    return this.$refs.horizontalScroll as HTMLElement;
  }

  get verticalScrollContainer(): HTMLElement {
    return this.$refs.verticalScrollContainer as HTMLElement;
  }

  get horizontalScrollContainer(): HTMLElement {
    return this.$refs.horizontalScrollContainer as HTMLElement;
  }

  get contentContainer(): HTMLElement {
    return this.$refs.container as HTMLElement;
  }

  get root(): HTMLElement {
    return this.$refs.root as HTMLElement;
  }

  get containerStyles() {
    return {
      width: `calc(100% + ${this.verticalScrollbarSize}px)`,
      height: `calc(100% + ${this.horizontalScrollbarSize}px)`,
    };
  }

  get rootClasses() {
    return {
      'st-scrollbar--dragged': this.verticalScrollData.isDrag || this.horizontalScrollData.isDrag,
      'st-scrollbar--vertical-scrollable': this.verticalScrollData.isVisible,
      'st-scrollbar--horizontal-scrollable': this.horizontalScrollData.isVisible,
    };
  }

  get verticalScrollStyles() {
    const {
      scrollContainerSize,
      scrollSize,
      scrollPositionPercent,
    } = this.verticalScrollData;

    const relativeScrollContainerSize = scrollContainerSize - scrollSize;
    const scrollContainer1Percent = relativeScrollContainerSize / 100;
    const scrollTopPosition = scrollContainer1Percent * scrollPositionPercent;
    const maxPosition = scrollContainerSize - scrollSize;

    return this.scrollStyles(scrollTopPosition, maxPosition, 0, scrollSize, 'top', 'height');
  }

  get horizontalScrollStyles() {
    const {
      scrollContainerSize,
      scrollSize,
      scrollPositionPercent,
    } = this.horizontalScrollData;

    const relativeScrollContainerSize = scrollContainerSize - scrollSize;
    const scrollContainer1Percent = relativeScrollContainerSize / 100;
    const scrollTopPosition = scrollContainer1Percent * scrollPositionPercent;
    const maxPosition = scrollContainerSize - scrollSize;

    return this.scrollStyles(scrollTopPosition, maxPosition, 0, scrollSize, 'left', 'width');
  }

  scrollStyles(current: number, max: number, min: number, scrollSize: number, position: string, size: string) {
    if (current < min) {
      return {
        [size]: `${scrollSize}px`,
        [position]: `${min}px`,
      };
    }

    if (current > max) {
      return {
        [size]: `${scrollSize}px`,
        [position]: `${max}px`,
      };
    }

    return {
      [size]: `${scrollSize}px`,
      [position]: `${current}px`,
    };
  }
}

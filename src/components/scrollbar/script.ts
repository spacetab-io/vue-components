/* eslint-disable no-param-reassign */
import {
  Component,
  Vue,
} from 'vue-property-decorator';

interface ScrollParameters {
  contentSize: number,
  scrollSize: number,
  scrollPositionPercent: number,
  scrollContainerSize: number,
  dragStart: number,
  isDrag: boolean,
}

interface ExtendedMouseEvent extends MouseEvent {
  path: Element[],
}

@Component({
  name: 'StScrollbar',
})
export default class StScrollbar extends Vue {
  public verticalScrollData: ScrollParameters = {
    contentSize: 0,
    scrollSize: 0,
    scrollPositionPercent: 0,
    scrollContainerSize: 0,
    dragStart: 0,
    isDrag: false,
  };

  public horizontalScrollData: ScrollParameters = {
    contentSize: 0,
    scrollSize: 0,
    scrollPositionPercent: 0,
    scrollContainerSize: 0,
    dragStart: 0,
    isDrag: false,
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
    // @ts-ignore
    this.verticalScroll.addEventListener('mousedown', this.onVerticalMouseDown);
    // @ts-ignore
    this.horizontalScroll.addEventListener('mousedown', this.onHorizontalMouseDown);
    // @ts-ignore
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  public recalculateData() {
    this.verticalScrollData.contentSize = this.contentContainer.scrollHeight;
    this.verticalScrollData.scrollContainerSize = this.verticalScrollContainer.clientHeight;
    this.verticalScrollData.scrollSize = this.verticalScrollData.scrollContainerSize
        * this.verticalScrollData.scrollContainerSize
        / this.verticalScrollData.contentSize;

    this.horizontalScrollData.contentSize = this.contentContainer.scrollWidth;
    this.horizontalScrollData.scrollContainerSize = this.horizontalScrollContainer.clientWidth;
    this.horizontalScrollData.scrollSize = this.horizontalScrollData.scrollContainerSize
        * this.horizontalScrollData.scrollContainerSize
        / this.horizontalScrollData.contentSize;
  }

  public recalculateScrollPosition() {
    const container = (this.$refs.container as Element);

    this.verticalScrollData.scrollPositionPercent = (
      container.scrollTop / (container.scrollHeight - container.clientHeight)
    ) * 100;
    this.horizontalScrollData.scrollPositionPercent = (
      container.scrollLeft / (container.scrollWidth - container.clientWidth)
    ) * 100;
  }

  public onScrollContainerClicked(event: ExtendedMouseEvent, isVertical: boolean = true) {
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
    this.verticalScrollData.dragStart = event.clientY;
  }

  public onHorizontalMouseDown(event: MouseEvent) {
    this.horizontalScrollData.isDrag = true;
    this.horizontalScrollData.dragStart = event.clientX;
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
        this.verticalScrollContainer.clientHeight,
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
        this.horizontalScrollContainer.clientWidth,
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
  ): ScrollToOptions {
    if (currentPosition < minCursorPosition) {
      return vertical ? {
        top: 0,
      } : {
        left: 0,
      };
    }

    if (currentPosition > maxCursorPosition) {
      return vertical ? {
        top: contentScrollSize,
      } : {
        left: contentScrollSize,
      };
    }

    const scrollPosition = contentScrollSize / 100 * (
      (currentPosition - minCursorPosition) / scrollContainerSize * 100
    );

    return vertical ? {
      top: scrollPosition,
    } : {
      left: scrollPosition,
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

  public isScrollHovered(event: ExtendedMouseEvent, vertical: boolean = true) {
    if (vertical) {
      return event.path[0] === this.$refs.verticalScroll;
    }
    return event.path[0] === this.$refs.horizontalScroll;
  }

  get verticalScroll(): Element {
    return (this.$refs.verticalScroll as Element);
  }

  get horizontalScroll(): Element {
    return (this.$refs.horizontalScroll as Element);
  }

  get verticalScrollContainer(): Element {
    return (this.$refs.verticalScrollContainer as Element);
  }

  get horizontalScrollContainer(): Element {
    return (this.$refs.horizontalScrollContainer as Element);
  }

  get contentContainer(): Element {
    return (this.$refs.container as Element);
  }

  get root(): Element {
    return (this.$refs.root as Element);
  }

  get containerStyles() {
    return {
      width: `calc(100% + ${this.verticalScrollbarSize}px)`,
      height: `calc(100% + ${this.horizontalScrollbarSize}px)`,
    };
  }

  get rootClasses() {
    return {
      'st-scrollbar--hovered': this.verticalScrollData.isDrag || this.horizontalScrollData.isDrag,
    };
  }

  get verticalScrollStyles() {
    const scrollContainer1Percent = this.verticalScrollData.scrollContainerSize / 100;
    const scrollTopPosition = scrollContainer1Percent * this.verticalScrollData.scrollPositionPercent;

    const scrollSize1Percent = this.verticalScrollData.scrollSize / 100;
    const scrollTopOffset = scrollSize1Percent * this.verticalScrollData.scrollPositionPercent;

    return {
      height: `${this.verticalScrollData.scrollSize}px`,
      top: `${scrollTopPosition - scrollTopOffset}px`,
    };
  }

  get horizontalScrollStyles() {
    const scrollContainer1Percent = this.horizontalScrollData.scrollContainerSize / 100;
    const scrollTopPosition = scrollContainer1Percent * this.horizontalScrollData.scrollPositionPercent;

    const scrollSize1Percent = this.horizontalScrollData.scrollSize / 100;
    const scrollTopOffset = scrollSize1Percent * this.horizontalScrollData.scrollPositionPercent;

    return {
      width: `${this.horizontalScrollData.scrollSize}px`,
      left: `${scrollTopPosition - scrollTopOffset}px`,
    };
  }
}

import {
  Component,
  Emit,
  toNative,
  Vue,
} from 'vue-facing-decorator';

import StIcon from '../../icon/index.vue';


@Component({
  name: 'StDatepickerNavigation',
  components: {
    StIcon,
  },
})
class StDatepickerNavigation extends Vue {
  @Emit('navigate-left')
  emitNavigateLeft(event: MouseEvent): MouseEvent {
    return event;
  }

  @Emit('navigate-right')
  emitNavigateRight(event: MouseEvent): MouseEvent {
    return event;
  }

  navigateLeft(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.emitNavigateLeft(event);
  }

  navigateRight(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.emitNavigateRight(event);
  }
}

export default toNative(StDatepickerNavigation);
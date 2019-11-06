import {
  Component,
  Emit,
  Vue,
} from 'vue-property-decorator';

import StIcon from '../../icon/index.vue';


@Component({
  name: 'StDatepickerNavigation',
  components: {
    StIcon,
  },
})
export default class StDatepickerNavigation extends Vue {
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

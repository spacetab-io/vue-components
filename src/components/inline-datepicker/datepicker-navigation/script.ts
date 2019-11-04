import {
  Component,
  Emit,
  Vue,
} from 'vue-property-decorator';

import StIcon from '../../icon/index.vue';

@Component({
  name: 'st-datepicker-navigation',
  components: {
    StIcon,
  },
})
export default class StDatepickerNavigation extends Vue {
  @Emit('navigate-left')
  emitNavigateLeft(event: MouseEvent) {
    event.preventDefault();

    return event;
  }

  @Emit('navigate-right')
  emitNavigateRight(event: MouseEvent) {
    event.preventDefault();

    return event;
  }

  navigateLeft(event: MouseEvent) {
    event.preventDefault();

    this.emitNavigateLeft(event);
  }

  navigateRight(event: MouseEvent) {
    event.preventDefault();

    this.emitNavigateRight(event);
  }
}

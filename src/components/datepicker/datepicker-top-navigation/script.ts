import {
  Component, Emit, Prop, Vue,
} from 'vue-property-decorator';

import StIcon from '../../icon/index.vue';

@Component({
  name: 'StDatepickerTopNavigation',
  components: {
    StIcon,
  },
})
export default class StDatepickerTopNavigation extends Vue {
  @Emit('navigate-left')
  emitNavigateLeft(event: MouseEvent) {
    return event;
  }

  @Emit('navigate-right')
  emitNavigateRight(event: MouseEvent) {
    return event;
  }

  navigateLeft(event: MouseEvent) {
    event.preventDefault();
    console.log(event.toElement !== event.relatedTarget);

    this.emitNavigateLeft(event);
  }

  navigateRight(event: MouseEvent) {
    event.preventDefault();

    this.emitNavigateRight(event);
  }
}

import { Component, Prop, toNative, Vue } from 'vue-facing-decorator';

import StIcon from '../icon/index.vue';
import { NotificationTypes } from './types';


@Component({
  name: 'StNotification',
  components: {
    StIcon,
  },
})
class StNotification extends Vue {
  @Prop({ type: String})
  id!: string;

  @Prop({ type: String})
  title?: string;

  @Prop({ type: String, required: true })
  message!: string;

  @Prop({ type: String, default: NotificationTypes.info })
  type!: NotificationTypes;

  @Prop({ type: String})
  customType!: string;

  @Prop({ type: Boolean, default: true })
  closeable!: boolean;

  @Prop({ type: Number, default: 4500 })
  duration!: number;

  @Prop({ type: String})
  icon?: string;

  timer: number = 0;

  visible = false;

  get typeName(): string {
    return this.type === NotificationTypes.custom ? this.customType : this.type;
  }

  mounted() {
    this.$nextTick(this.initialize);
  }

  initialize() {
    this.visible = true;
    this.setTimer();
  }

  setTimer() {
    if (this.duration > 0) {
      this.timer = window.setTimeout(this.close, this.duration);
    }
  }

  onMouseEnter() {
    clearTimeout(this.timer);
  }

  onMouseLeave() {
    this.setTimer();
  }

  close() {
    this.visible = false;
    this.$emit('close');
  }
}

export default toNative(StNotification);
import { Component, Prop, Vue } from 'vue-property-decorator';

import StIcon from '../icon/index.vue';
import { NotificationTypes } from './types';


@Component({
  name: 'StNotification',
  components: {
    StIcon,
  },
})
export default class StNotification extends Vue {
  @Prop(String)
  id!: string;

  @Prop(String)
  title?: string;

  @Prop({ type: String, required: true })
  message!: string;

  @Prop({ type: String, default: NotificationTypes.info })
  type!: NotificationTypes;

  @Prop(String)
  customType!: string;

  @Prop({ type: Boolean, default: true })
  closeable!: boolean;

  @Prop({ type: Number, default: 4500 })
  duration!: number;

  @Prop(String)
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
      this.timer = setTimeout(this.close, this.duration);
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

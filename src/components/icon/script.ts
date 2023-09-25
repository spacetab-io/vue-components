import './_icons.generated';

import {
  Component,
  Prop,
  toNative,
  Vue,
} from 'vue-facing-decorator';


@Component({
  name: 'StIcon',
})
class StIcon extends Vue {
  @Prop({ type: String, required: true })
  name!: string;

  get iconClass() {
    return [
      'st-icon',
      this.name ? `st-icon--${this.name}` : '',
    ];
  }

  handleClick(event: any) {
    this.$emit('click', event);
  }
}

export default toNative(StIcon);
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';
import '../../utils/icons';

@Component
export default class Icon extends Vue {
  @Prop({ type: String, required: true })
  name!: string;

  get iconClass() {
    return [
      'st-icon',
      this.name ? 'st-icon--' + this.name : '',
    ];
  }

  handleClick(event: any) {
    this.$emit('click', event);
  }
}

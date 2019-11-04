import {
  Component,
  Emit,
  Prop,
  Vue,
} from 'vue-property-decorator';

@Component
export default class StDatepickerNavigationSlider extends Vue {
  @Prop({ type: Boolean, default: true })
  prevAllowed!: boolean;

  @Prop({ type: Boolean, default: true })
  nextAllowed!: boolean;

  @Prop({ type: String, required: true })
  label!: string;

  @Prop({ type: Boolean, default: true })
  labelHoverable!: boolean;

  @Emit('prev-click')
  emitPrevClick() {

  }

  @Emit('next-click')
  emitNextClick() {

  }

  @Emit('label-clicked')
  emitLabelClick() {

  }
}

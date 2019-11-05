import {
  Component,
  Emit,
  Prop,
  Vue,
} from 'vue-property-decorator';

@Component({
  name: 'StDatepickerNavigationSlider',
})
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
  emitPrevClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  @Emit('next-click')
  emitNextClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  @Emit('label-clicked')
  emitLabelClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }
}

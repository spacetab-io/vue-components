import tingle from 'tingle.js';
import {
  Component,
  Emit,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';

import StIcon from '../icon/index.vue';
import { DialogPlacement } from './types';

const Modal = tingle.modal;


@Component({
  name: 'StDialog',
  components: {
    StIcon,
  },
})
export default class StDialog extends Vue {
  @Prop({ type: Boolean, required: true })
  value!: boolean;

  @Prop({ type: Boolean, default: false })
  disableOverlayClose!: boolean;

  @Prop({ type: Boolean, default: false })
  disableEscapeClose!: boolean;

  @Prop(String)
  width?: string;

  @Prop({ type: Boolean, default: false })
  centerContent?: boolean;

  @Prop({ type: String, default: 'cross' })
  closeIcon!: string;

  @Prop({ type: Boolean, default: false })
  hideCloseIcon!: boolean;

  @Prop({ type: String, default: 'default' })
  placement!: DialogPlacement;

  modal!: typeof tingle.modal;

  @Watch('value')
  onValueChanged(newVal: boolean) {
    if (newVal) {
      this.modal.open();
      return;
    }

    this.modal.close();
  }

  @Watch('placement')
  onPlacementChanged(newVal: DialogPlacement) {
    this.modal.modal.setAttribute('st-dialog-placement', newVal);
  }

  @Watch('width')
  onWidthChanged(newVal?: string) {
    if (!newVal) {
      this.modal.modalBox.style.width = null;
      return;
    }

    this.modal.modalBox.style.width = newVal;
  }

  @Emit('input')
  emitInput(newVal: boolean): boolean {
    return newVal;
  }

  beforeDestroy() {
    this.modal.destroy();
  }

  mounted() {
    const closeMethods = [];
    if (!this.disableEscapeClose) {
      closeMethods.push('escape');
    }

    if (!this.disableOverlayClose) {
      closeMethods.push('overlay');
    }

    this.modal = new Modal({
      closeMethods,
      onClose: () => this.emitInput(false),
    });
    this.modal.setContent(this.$el);

    this.modal.modal.classList.add('st-dialog-root');
    this.modal.modalBox.classList.add('st-dialog-root__box');
    this.modal.modalBoxContent.classList.add('st-dialog-root__content');

    this.onWidthChanged(this.width);
    this.onPlacementChanged(this.placement);
  }
}

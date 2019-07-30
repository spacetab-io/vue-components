import StDefaultButton from '../../../../components/button/script';

import { Component } from 'vue-property-decorator';
import StIcon from '../../../../components/icon/index.vue';

@Component({
  components: {
    StIcon,
  },
})
export default class StExampleButton extends StDefaultButton {
  dynamicType = 'success';

  get buttonClass() {
    return [
      this.dynamicType ? 'st-button--' + this.dynamicType : '',
      this.buttonSize ? 'st-button--' + this.buttonSize : '',
      {
        'st-button--disabled': this.disabled,
        'st-button--loading': this.loading,
        'st-button--plain': this.plain,
        'st-button--round': this.round,
        'st-button--circle': this.circle,
        'st-button--approve': this.approve,
        'st-button--cancel': this.cancel,
        'st-button--remove': this.remove,
        'st-button--search': this.search,
        'st-button--icon': this.icon,
        'st-button--bold-border': this.boldBorder,
      },
    ];
  }

  handleClick($event: any) {
    this.$emit('click', $event);
    this.changeDynamicType();
  }

  changeDynamicType() {
    const isPrimary = this.dynamicType === 'success';
    this.dynamicType = isPrimary ? 'danger' : 'success';
  }
}

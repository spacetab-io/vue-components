import {
  Component,
  toNative,
  Vue,
} from 'vue-facing-decorator';


@Component({
  name: 'StButtonGroup',
})
class StButtonGroup extends Vue {}

export default toNative(StButtonGroup);
import {
  Component,
  Prop,
  toNative,
  Vue,
} from 'vue-facing-decorator';

import { BadgeFill, BadgeTypes } from './types';


@Component({
  name: 'StBadge',
})
class StBadge extends Vue {
  @Prop({ type: String })
  text!: string;

  @Prop({ type: String })
  icon!: string;

  @Prop({ type: String, default: BadgeTypes.block })
  type!: BadgeTypes;

  @Prop({ type: String })
  customType!: string;

  @Prop({ type: String, default: BadgeFill.full })
  fill!: BadgeFill;

  @Prop({ type: Boolean })
  round!: boolean;

  get typeName(): string {
    return this.type === BadgeTypes.custom ? this.customType : this.type;
  }
}

export default toNative(StBadge);
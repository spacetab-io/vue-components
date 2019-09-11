import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';

import { BadgeFill, BadgeTypes } from './types';


@Component({
  name: 'StBadge',
})
export default class StBadge extends Vue {
  @Prop(String)
  text!: string;

  @Prop(String)
  icon!: string;

  @Prop({ type: String, default: BadgeTypes.block })
  type!: BadgeTypes;

  @Prop(String)
  customType!: string;

  @Prop({ type: String, default: BadgeFill.full })
  fill!: BadgeFill;

  @Prop(Boolean)
  round!: boolean;

  get typeName(): string {
    return this.type === BadgeTypes.custom ? this.customType : this.type;
  }
}

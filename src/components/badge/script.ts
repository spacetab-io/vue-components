import { Component, Prop, Vue } from 'vue-property-decorator';

import { BADGE_FILL, BADGE_TYPES } from './types';


@Component({
  name: 'StBadge',
})
export default class StBadge extends Vue {
  @Prop(String)
  text!: string;

  @Prop(String)
  icon!: string;

  @Prop({ type: String, default: BADGE_TYPES.BLOCK })
  type!: BADGE_TYPES;

  @Prop(String)
  customType!: string;

  @Prop({ type: String, default: BADGE_FILL.FULL })
  fill!: BADGE_FILL;

  @Prop(Boolean)
  round!: boolean;

  get typeName(): string {
    return this.type === BADGE_TYPES.CUSTOM ? this.customType : this.type;
  }
}

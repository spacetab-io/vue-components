import {
  PopperPlacement,
  TriggerType,
} from '../popper/types';

export interface DropdownBindProperties {
  value?: boolean;
  popperClass?: string;
  width?: number;
  useReferenceWidth?: boolean;
  trigger?: TriggerType;
  placement?: PopperPlacement;
  arrowVisible?: boolean;
  withBorder?: boolean;
  disabled?: boolean;
  boundariesSelector?: string;
  appendToBody?: boolean;
  stopPropagation?: boolean;
  preventDefault?: boolean;
  forceShow?: boolean;
  transition?: string;
  enterActiveClass?: string;
  leaveActiveClass?: string;
  delayOnMouseOver?: number;
  delayOnMouseOut?: number;
}

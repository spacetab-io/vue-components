export enum TriggerType {
  click = 'click',
  hover = 'hover',
  focus = 'focus',
  manual = 'manual',
}

export enum PopperPlacement {
  autoStart = 'auto-start',
  auto = 'auto',
  autoEnd = 'auto-end',
  topStart = 'top-start',
  top = 'top',
  topEnd = 'top-end',
  rightStart = 'right-start',
  right = 'right',
  rightEnd = 'right-end',
  bottomEnd = 'bottom-end',
  bottom = 'bottom',
  bottomStart = 'bottom-start',
  leftEnd = 'left-end',
  left = 'left',
  leftStart = 'left-start',
}

export interface PopperBindProperties {
  tag?: string;
  enterActiveClass?: string;
  delayOnMouseOver?: number;
  width?: number;
  useReferenceWidth?: boolean;
  delayOnMouseOut?: number;
  boundariesSelector?: string;
  arrowVisible?: boolean;
  leaveActiveClass?: string;
  transition?: string;
  placement?: string;
  appendToBody?: boolean;
  reference?: Element;
  trigger?: TriggerType;
  stopPropagation?: boolean;
  preventDefault?: boolean;
  forceShow?: boolean;
  disabled?: boolean;
  withBorder?: boolean;
  popperClass?: string;
  content?: string;
  value?: boolean;
}

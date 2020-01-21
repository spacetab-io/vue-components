export type BaseSelectValue = (SingleSelectValue | MultipleSelectValue);
export type SingleSelectValue = string;
export type MultipleSelectValue = string[];

export interface SelectOption {
  label: string;
  value: string;
  selected?: boolean;
  readonly?: boolean;
  disabled?: boolean;
}

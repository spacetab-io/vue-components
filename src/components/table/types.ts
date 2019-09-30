
export interface Column {
  name: string,
  label: string,
  field: string | Function,
  sortable?: boolean,
  sort?: Function,
  centered?: boolean,
  renderHtml?: boolean,
  width?: number | string,
  class?: any[] | object | string,
  style?: any[] | object | string,
  [key: string]: any,
}

export enum SortDirection {
  asc = 'asc',
  desc = 'desc',
}

export interface SortEvent {
  sortBy?: string,
  direction?: SortDirection,
}

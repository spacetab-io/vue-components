
export interface ConfigItem {
  name: string,
  label: string,
  field: string | Function,
  sortable?: boolean,
  sort?: Function,
  centered?: boolean,
  renderHtml?: boolean,
  width?: number,
  class?: any[] | object | string,
  style?: any[] | object | string,
}

export enum SortDirections {
  asc = 'asc',
  desc = 'desc',
}

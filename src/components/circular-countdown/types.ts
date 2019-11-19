export enum CountdownStatusList {
  info = 'info',
  danger = 'danger',
  warning = 'warning',
  success = 'success',
}

export interface UnitNames {
  day: string,
  hour: string,
  minute: string,
  second: string,
}

export interface TimeLeft {
  time: number,
  unit: string,
}

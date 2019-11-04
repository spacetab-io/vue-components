import moment, { Moment } from 'moment';

import { DisabledRange } from './types';

import StartOf = moment.unitOfTime.StartOf;

interface IsDateDisabledParams {
  date: Moment,
  unit: StartOf,
  disabledFrom?: string,
  disabledTo?: string,
  disabledRanges?: DisabledRange[],
}

export class DatepickerUtils {
  static chunk<T>(items: T[], perChunk: number): T[][] {
    const chunkedItems: T[][] = [];

    const itemsCount = items.length;
    for (let i = 0; i < itemsCount; i += perChunk) {
      chunkedItems.push(items.slice(i, i + perChunk));
    }

    return chunkedItems;
  }

  public static isDateDisabled(params: IsDateDisabledParams): boolean {
    if (this.isDateValid(params.disabledFrom)
      && params.date.isAfter(moment(params.disabledFrom), params.unit)) {
      return true;
    }


    if (this.isDateValid(params.disabledTo)
      && params.date.isBefore(moment(params.disabledTo), params.unit)) {
      return true;
    }

    return !!(params.disabledRanges && params.disabledRanges.some(date => (
      params.date.isAfter(moment(date.from)) && params.date.isBefore(moment(date.to))
    )));
  }

  static isDateValid(date?: string): date is string {
    return !!date && moment(date).isValid();
  }
}

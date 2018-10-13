import { Pipe, PipeTransform } from '@angular/core';
import { differenceInCalendarDays } from 'date-fns';

@Pipe({
  name: 'daysCalculator',
})
export class DaysCalculatorPipe implements PipeTransform {
  transform(dates: Date[] = []): number {
    if (!dates || dates.length === 0) {
      return 0;
    }
    const [date1, date2] = dates;
    return differenceInCalendarDays(date2, date1) + 1;
  }
}

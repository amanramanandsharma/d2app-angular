import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsTime'
})
export class SecondsTimePipe implements PipeTransform {

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return minutes + ' Mins ' + (value - minutes * 60) + 's';
 }
}

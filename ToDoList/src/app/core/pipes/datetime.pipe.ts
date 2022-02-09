import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datetime'
})
export class DatetimePipe implements PipeTransform {

  transform(value: Date): string {
    let datetime = value.toString();
    let tmp : string[] = (datetime.split('T')[0]).split('-');
    let time : string = (datetime.split('T')[1]).split('.')[0];
    let date : string = tmp[2] + '.' + tmp[1] + '.' + tmp[0];
    return (date + ' ' + time);
  }

}

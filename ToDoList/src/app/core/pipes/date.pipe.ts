import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: Date): string {
    let datetime = value.toString();
    let tmp : string[] = (datetime.split('T')[0]).split('-');
    let date : string = tmp[2] + '.' + tmp[1] + '.' + tmp[0];
    return date;
  }

}

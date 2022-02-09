import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parser'
})
export class ParserPipe implements PipeTransform {

  transform(title: string) : string {
    if(title.length > 25) return title.substring(0, 25) + "...";
    else return title;
  }

}

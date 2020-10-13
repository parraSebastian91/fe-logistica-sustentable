import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uperCaseFirst'
})
export class UperCaseFirstPipe implements PipeTransform {

  transform(value: any): any {
    if (!value) {
      value = '';
    }
    // return `${value.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase() )}`;
    return `${value.replace(/[_]/gi, ' ').replace(/\b\w/g, l => l.toUpperCase())}`;
  }

}

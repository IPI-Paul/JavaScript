import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    let newString = '';
    for (let char of `${value}`) {
      newString = char + newString;
    }
    if(args[0]) {
      // I want a fullstop
      newString += '.';
    }
    if(args[1] === 'singlequote') {
      newString = "'" + newString + "'";
    } else if(args[1] === 'doublequote') {
      newString = '"' + newString + '"';
    }
    return newString;
  }

}

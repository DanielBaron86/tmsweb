import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToString',
})
export class EnumToStringPipe implements PipeTransform {

  transform(value: number|undefined | null, enumObj: any): string {
    if ((value === undefined || value === null) || !enumObj) { return ''; }
    const enumValue = enumObj[value];
    return enumValue ? enumValue : '';
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'toCamelCase'
})
export class ToCamelCasePipe implements PipeTransform {
    transform(string) {
        const newString = string.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })
        return newString;
    }
}

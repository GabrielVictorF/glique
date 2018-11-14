import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TurnoPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'data',
})
export class DataPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value) {
    let hoje = new Date();
    if (value != null) {
      var dateVal ="/Date(" + value + ")/";
      var date = new Date( parseFloat( dateVal.substr(6 )));
      var novaData = date.toLocaleString();
      novaData = novaData.substring(0,10);
      return novaData;
    }
    return value;
  }
}
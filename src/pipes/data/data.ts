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
   *  Transforma uma data no formato DD/MM/YYYY
   */
  transform(value) {
    let hoje = new Date();
    if (value != null) {
      let dateVal ="/Date(" + value + ")/";
      let date = new Date( parseFloat( dateVal.substr(6 )));
      let novaData = date.toLocaleString();
      novaData = novaData.substring(0,10);
      return novaData;
    }
    return value;
  }
}
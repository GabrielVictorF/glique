import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TurnoPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'mes',
})
export class MesPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value) {
    value = new Date(value);
    let res = value.getMonth();
    console.log("Mes = " + res);
    switch(res) {
      case 10:
      return "Outubro";
    }
  }
}
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TurnoPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'turno',
})
export class TurnoPipe implements PipeTransform {
  /**
   * Transforma um número de turno(1, 2, 3) em nome de turno
   */
  transform(value: number) {
  	if (value == 1)
  		return 'Café';
  	else if (value == 2)
  		return 'Almoço';
  	else 
  		return 'Jantar / Noite';
    //return value.toLowerCase();
  }
}

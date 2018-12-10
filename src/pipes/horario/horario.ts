import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TurnoPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'horario',
})
export class HorarioPipe implements PipeTransform {
  /**
   * Transforma uma data em horário, no formato: HH:MM:SS
   */
  transform(value) {
  	const format = new Date(value);
  	let newFormat = format.toString();
  	newFormat = newFormat.substring(16, 24);
  	return newFormat;
  }
}
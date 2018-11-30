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
   * Takes a value and makes it lowercase.
   */
  transform(value) {
  	let format = new Date(value);
  	format = format.toString();
  	format = format.substring(16, 24);
  	return format;
  }
}
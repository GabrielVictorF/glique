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
   * Transforma um número de turno(de 1 a 6) em nome de turno respectivamente
   */
  transform(value: number) {
    switch (value) {
      case 1:
        return 'Jejum';
      case 2:
        return 'Antes do almoço';
      case 3:
        return 'Depois do almoço';
      case 4:
        return 'Lanche';
      case 5:
        return 'Antes do jantar';
      case 6:
        return 'Depois do jantar';
    }
  }
}

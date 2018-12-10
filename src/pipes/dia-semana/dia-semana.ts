import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TurnoPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'dia_semana',
})
export class DiaSemanaPipe implements PipeTransform {
  /**
   * Transforma uma data em um dia da semana, de acordo com o dia
   */
  transform(value) {
    let formatado: any = new Date(value);
    formatado = formatado.getDay();

    switch (formatado) {
      case 1:
        return "Segunda";
      case 2:
        return "Terça";
      case 3:
        return "Quarta";
      case 4:
        return "Quinta";
      case 5:
        return "Sexta";
      case 6:
        return "Sábado";
      case 0:
        return "Domingo";
      default:
        return "Unknow";
    }
  }
}
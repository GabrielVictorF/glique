import { NgModule } from '@angular/core';
import { TurnoPipe } from './turno/turno';
import { DataPipe } from './data/data';
import { DiaSemanaPipe } from './dia-semana/dia-semana';
import { MesPipe } from './mes/mes';
import { HorarioPipe } from './horario/horario';

@NgModule({
	declarations: [TurnoPipe, DataPipe, DiaSemanaPipe, MesPipe, HorarioPipe],
	imports: [],
	exports: [TurnoPipe, DataPipe, DiaSemanaPipe, MesPipe, HorarioPipe]
})
export class PipesModule {}

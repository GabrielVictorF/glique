import { NgModule } from '@angular/core';
import { TurnoPipe } from './turno/turno';
import { DataPipe } from './data/data';
import { DiaSemanaPipe } from './dia-semana/dia-semana';
import { MesPipe } from './mes/mes';

@NgModule({
	declarations: [TurnoPipe, DataPipe, DiaSemanaPipe, MesPipe],
	imports: [],
	exports: [TurnoPipe, DataPipe, DiaSemanaPipe, MesPipe]
})
export class PipesModule {}

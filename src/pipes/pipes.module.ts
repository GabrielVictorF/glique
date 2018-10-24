import { NgModule } from '@angular/core';
import { TurnoPipe } from './turno/turno';
import { DataPipe } from './data/data';
import { DiaSemanaPipe } from './dia-semana/dia-semana';

@NgModule({
	declarations: [TurnoPipe, DataPipe, DiaSemanaPipe],
	imports: [],
	exports: [TurnoPipe, DataPipe, DiaSemanaPipe]
})
export class PipesModule {}

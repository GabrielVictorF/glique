import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicoesPage } from './medicoes';

@NgModule({
  declarations: [
    MedicoesPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicoesPage),
  ],
})
export class MedicoesPageModule {}

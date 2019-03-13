import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlimentosPage } from './alimentos';

@NgModule({
  declarations: [
    AlimentosPage,
  ],
  imports: [
    IonicPageModule.forChild(AlimentosPage),
  ],
})
export class AlimentosPageModule {}

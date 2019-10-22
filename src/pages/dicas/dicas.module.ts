import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DicasPage } from './dicas';

@NgModule({
  declarations: [
    DicasPage,
  ],
  imports: [
    IonicPageModule.forChild(DicasPage),
  ],
})
export class DicasPageModule {}

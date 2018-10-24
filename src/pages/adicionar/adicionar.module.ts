import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdicionarPage } from './adicionar';

@NgModule({
  declarations: [
    AdicionarPage,
  ],
  imports: [
    IonicPageModule.forChild(AdicionarPage),
  ],
})
export class AdicionarPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastrarPage } from './cadastrar';

@NgModule({
  declarations: [
    CadastrarPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastrarPage),
  ],
})
export class CadastrarPageModule {}

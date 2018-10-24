import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FunctionsProvider } from '../../providers/functions/functions';
import { ApiProvider } from '../../providers/api/api';

@Component({
  templateUrl: 'edita.html'
})

export class EditaPage {
  private item: any = [];
  private alteracao
  constructor(public navParams: NavParams, public navCtrl: NavController, public functions: FunctionsProvider,  public api: ApiProvider) {
    this.item = this.navParams.get('itemSelecionado');
    console.log(this.item);
  }

  public edita() {
    this.api.putMedicao(this.item).subscribe(res => {
      this.functions.showToast('Atualizado!');
      this.navCtrl.pop();
      console.log(res);
    }, Error => {
      console.log(Error);
    });
  }
}
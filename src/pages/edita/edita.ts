import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { LoginPage } from '../login/login';

import { FunctionsProvider } from '../../providers/functions/functions';
import { ApiProvider } from '../../providers/api/api';

@Component({
  templateUrl: 'edita.html'
})

export class EditaPage {
  private item: any = [];
  
  constructor(public navParams: NavParams, public navCtrl: NavController, 
  public functions: FunctionsProvider,  public api: ApiProvider, public loadingCtrl: LoadingController,
  public alertCtrl: AlertController) {
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

  logout() {
    const confirm = this.alertCtrl.create({
      title: 'Um momento',
      message: 'Tem certeza que deseja sair?',
      buttons: [{
        text: 'Sim',
        handler: () => {
          const load = this.loadingCtrl.create({
          content: 'Saindo...'
        });
          load.present();
          this.api.logout().subscribe(res => {
            load.dismiss();
            localStorage.removeItem("userToken");
            this.navCtrl.setRoot(LoginPage);
          },
          Error => {
            console.log(Error);
          });
        }
      },
      {
        text: 'Não'
      }]
    });
    confirm.present();
  }
}
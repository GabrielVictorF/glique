import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { MedicoesPage } from '../medicoes/medicoes';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
import { RelatoriosPage } from '../relatorios/relatorios';

import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public api: ApiProvider, 
    public functions: FunctionsProvider, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
  
  }

  public medicoes() {
  	this.navCtrl.push(MedicoesPage);
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
            //this.navCtrl.length = 0;
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

  relatorios() {
    this.navCtrl.push(RelatoriosPage);
  }
}

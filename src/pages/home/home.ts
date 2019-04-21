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
  protected turno: string;
  constructor(public navCtrl: NavController, public api: ApiProvider, 
    public functions: FunctionsProvider, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
    var turnoAgora = new Date().getHours();
    if (turnoAgora <= 5)
      this.turno = "Boa madrugada";
    else if (turnoAgora <= 19)
      this.turno = "Bom dia";
    else 
      this.turno = "Boa noite";
  }

  public medicoes() {
  	this.navCtrl.push(MedicoesPage);
  }

  relatorios() {
    this.navCtrl.push(RelatoriosPage);
  }
}

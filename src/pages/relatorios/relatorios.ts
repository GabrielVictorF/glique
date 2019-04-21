import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';

import { RelatorioResultadoPage } from '../relatorio-resultado/relatorio-resultado';
import { LoginPage } from '../login/login';

import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'page-relatorios',
  templateUrl: 'relatorios.html'
})

export class RelatoriosPage {
  constructor(public navCtrl: NavController, public api: ApiProvider, 
              public alertCtrl: AlertController, public loadingCtrl: LoadingController) {

  }

  relatorioMes() {
    this.navCtrl.push(RelatorioResultadoPage, {"funcao": 1});
  }
  relatorioAno() {
    this.navCtrl.push(RelatorioResultadoPage, {"funcao": 2});
  }
  relatorioSemana() {
    this.navCtrl.push(RelatorioResultadoPage, {"funcao": 3});
  }
}
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RelatorioResultadoPage } from '../relatorio-resultado/relatorio-resultado';

@Component({
  selector: 'page-relatorios',
  templateUrl: 'relatorios.html'
})

export class RelatoriosPage {
  constructor(public navCtrl: NavController) {

  }

  relatorioMes() {
    this.navCtrl.push(RelatorioResultadoPage);
  }
}
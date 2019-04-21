import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';
import { LoginPage } from '../login/login';

import { DetalhePage } from '../detalhe/detalhe';
import { ResultadoPage } from '../resultado/resultado';

@IonicPage()
@Component({
  selector: 'page-medicoes',
  templateUrl: 'medicoes.html',
})
export class MedicoesPage {
  private media: number;
  public turno;
  private altoBaixo = ''; 
  private ico = ["arrow-down", "arrow-up"];
  public show = false;
  private ocorrenciaData;
  private offset = 0;
  private qtdObj: number = {
    hoje: 0,
    total: 0
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: ApiProvider,
    public functions: FunctionsProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    this.quantidadeObj();
  }

  public getAllMedicoes(): any {
    this.navCtrl.push(ResultadoPage, {funcao: 1});
  }
  
  public medicoesHoje() {
      let data = this.functions.toEpoch();
      this.navCtrl.push(ResultadoPage, {funcao: 3, filtro: data});
  }

  public medicoesDiaEspecifico() {
    
    this.ocorrenciaData = this.functions.toEpoch(this.ocorrenciaData);
    this.navCtrl.push(ResultadoPage, {funcao: 4, filtro: this.ocorrenciaData});
  }

  quantidadeObj() {
    let hoje = this.functions.toEpoch();
    console.log(hoje)    
    this.api.getQuantidadeObjDia(hoje).subscribe(res => this.qtdObj.hoje = res);
    this.api.getQuantidadeObj().subscribe(res => {
      this.qtdObj.total = res;
      console.log(res);
    });
  }
}

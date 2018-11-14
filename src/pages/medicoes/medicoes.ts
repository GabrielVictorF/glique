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
  private ico = ["arrow-down", "arrow-down"];
  public show = {
    categoria: false,
    especifico: false,
    altoBaixo: false
  };
  private ocorrenciaData;
  private offset = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: ApiProvider,
    public functions: FunctionsProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController) { 
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad MedicoesPage');
  }

  mostra(icoPos: number) {
    switch(icoPos) {
      case 0:
        this.show.categoria = !this.show.categoria;
        if (this.show.especifico)
          this.show.especifico = false;
        break;
      case 1:
        this.show.especifico = !this.show.especifico;
        if (this.show.categoria)
          this.show.categoria = false;
        break;
      case 2:
        this.show.altoBaixo = !this.show.altoBaixo;
        break;
    }
    if(this.ico[icoPos] == "arrow-up") {
      this.ico[icoPos] = "arrow-down";
    }
    else {
      this.ico[icoPos] = "arrow-up";
    }
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

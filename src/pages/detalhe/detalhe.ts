import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ActionSheetController } from 'ionic-angular';

import { EditaPage } from '../edita/edita';

import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';

import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'detalhe.html'
})

export class DetalhePage {
  private item: any = []; //Item recebido do navigation
  private state = []; //Nivel de glicemia (bom ou ruim)
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public api: ApiProvider, public functions: FunctionsProvider, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController) {
    this.item = this.navParams.get('itemSelecionado');
  }

  ionViewWillEnter() {
    if (this.item.resultado_antes < 80)
      this.state[0] = "arrow-round-down";
    else if (this.item.resultado_antes >= 80 && this.item.resultado_antes <= 110)
      this.state[0] = "arrow-round-forward";
    else
     this.state[0] = "arrow-round-up";
    if (this.item.resultado_depois < 80)
      this.state[1] = "arrow-round-down"
    else if (this.item.resultado_depois >= 80 && this.item.resultado_depois <= 110)
      this.state[1] = "arrow-round-forward";
    else
      this.state[1] = "arrow-round-up";
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

  actionSheet() {
    const action = this.actionSheetCtrl.create({
      title: "Selecione a operação",
      buttons: [{
        text: 'Editar',
        icon: 'create',
        handler: () => {
         this.navCtrl.push(EditaPage, {'itemSelecionado': this.item});
        }
      },
      {
        text: 'Excluir',
        icon: 'trash',
        handler: () => {
          this.api.deleteMedicao(this.item.objectId).subscribe(res => {
      console.log(res);
      this.functions.showToast('Removido!');
      this.navCtrl.pop();
    }, Error => {
      this.functions.mostraAlert("Erro","Erro ao deletar dado!");
    });
        }
      }]
    });
    action.present();
  }
}
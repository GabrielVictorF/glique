import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';

import { FunctionsProvider } from '../../providers/functions/functions';
import { ApiProvider } from '../../providers/api/api';

import { LoginPage } from '../login/login';
import { DetalhePage } from '../detalhe/detalhe';
import { HomePage } from '../home/home';

/**
 * Generated class for the AdicionarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adicionar',
  templateUrl: 'adicionar.html',
})

export class AdicionarPage {
  private medicao = {
    data: '',
    turno: 0,
    valor: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public functions: FunctionsProvider, public api: ApiProvider, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, public toastCtrl: ToastController) {
    let hora: any = new Date();
    hora = hora.getTime();
    if (hora < 12)
      this.medicao.turno = 1;
    else if (hora < 18)
      this.medicao.turno = 2;
    else
      this.medicao.turno = 3;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdicionarPage');
  }

  clicked() {
    console.log('Clicked')
  }

  adicionar() {
    if (this.medicao.valor <= 0) {
      this.functions.showToast('O valor da glicemia não pode ser zero ou menor!');
    }
    else {
      let newTurno: string = "";
      switch (this.medicao.turno) {
        case 1:
          newTurno = "Café";
          break;
        case 2:
          newTurno = "Almoço";
          break;
        case 3:
          newTurno = "Jantar / Noite";
          break;
      }
      //Tela de confirmação desativada

      this.medicao.data = this.functions.toEpoch(this.medicao.data);

      this.api.postMedicao(this.medicao).subscribe(res => {
        this.medicao.data = "";
        const toast = this.toastCtrl.create({
          message: "Medição adicionada com sucesso!",
          duration: 2000,
          showCloseButton: true,
          closeButtonText: 'Ver registro'
        });

        toast.onDidDismiss((data, role) => {
          if (role == "close")
            this.navCtrl.push(DetalhePage, { "itemSelecionado": res })
        });
        toast.present();
        this.navCtrl.setRoot(HomePage)
      },
        Error => {
          this.functions.showToast(Error.error.message);
          console.log(Error);
        });
    }
  }
}

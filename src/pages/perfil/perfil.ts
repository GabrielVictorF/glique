import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';

import { ModalEditarPerfilPage } from './modal-editar-perfil/modal-editar-perfil';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  private dadosUser;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ApiProvider, public modalCtrl: ModalController, public functions: FunctionsProvider) {
      this.getInfoUserLogado()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  public getInfoUserLogado() {
    this.api.getInfoUser().subscribe(res => {
      this.dadosUser = res;
    });
  }

  public alterarPerfil() {
     let modal = this.modalCtrl.create(ModalEditarPerfilPage, { "data": this.dadosUser });
      modal.present();
  }

    public alterarSenha() {
    console.log("Ok")
    this.api.getAlterPassword().subscribe(() =>
      this.functions.showAlert("Sucesso", "Um link de alteração da sua senha foi enviado ao seu e-mail!")
    );
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';

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
    public api: ApiProvider) {
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
}

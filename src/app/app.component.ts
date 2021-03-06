import { Component } from '@angular/core';
import { Platform, LoadingController, AlertController } from 'ionic-angular';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { ApiProvider } from '../providers/api/api';
import { FunctionsProvider } from '../providers/functions/functions';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, public api: ApiProvider, public functions: FunctionsProvider,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    platform.ready().then(() => {
      if (localStorage.getItem('userToken')) {
        this.api.validaToken().subscribe(res => {
          if (res) {
            this.rootPage = TabsPage;
          } else {
            this.logout();
          }
        }, Error => this.rootPage = LoginPage);
      } else {
        this.rootPage = LoginPage;
      }
    });
  }

  logout() {
    let load = this.alertCtrl.create({
      title: 'Sessão expirou!',
      message: 'Sua sessão expirou, por favor logue novamente.',
      buttons: [{
        text: 'OK',
        handler: () => {
          const load = this.loadingCtrl.create({
            content: 'Saindo...'
          });
          load.present();
          this.api.logout().subscribe(res => {
            load.dismiss();
            localStorage.clear();
            this.rootPage = LoginPage;
          });
        }
      }]
    });
    load.present();
  }
}

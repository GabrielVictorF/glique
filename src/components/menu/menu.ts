import { Component } from '@angular/core';

import { AlertController, LoadingController, MenuController, App, NavController } from 'ionic-angular';

import { LoginPage } from '../../pages/login/login';
import { PerfilPage } from '../../pages/perfil/perfil';
import { FeedbackPage } from '../../pages/feedback/feedback';

import { ApiProvider } from '../../providers/api/api';
import { HelpPage } from '../../pages/help/help';
import { DicasPage } from '../../pages/dicas/dicas';

@Component({
  selector: 'menu',
  templateUrl: 'menu.html'
})
export class MenuComponent {

  text: string;

  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, 
    public app: App, public api: ApiProvider, public menuCtrl: MenuController) {
    console.log('Hello MenuComponent Component');
    this.text = 'Hello World';
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
            this.menuCtrl.close();
            //console.log("TOKEN ANTES DE LOGAR:" + localStorage.getItem("userToken"));
            //localStorage.removeItem("userToken");
            localStorage.clear();
            this.app.getRootNavs()[0].setRoot(LoginPage); //Erro de tabs solved
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

  pagePerfil() {
    this.app.getRootNavs()[0].push(PerfilPage);
  }

  feedback() {
    this.app.getRootNavs()[0].push(FeedbackPage);
  } 

  ajuda() {
    this.app.getRootNavs()[0].push(HelpPage);
  }

  dicas() {
    this.app.getRootNavs()[0].push(DicasPage);
  }
}

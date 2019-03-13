import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { TabsPage } from '../tabs/tabs';

import { FunctionsProvider } from '../../providers/functions/functions';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  private user = {
    email: '',
    password: ''
  }
  private image;
  constructor(public navCtrl: NavController, 
    public api: ApiProvider, 
    public alertCtrl: AlertController, 
    public functions: FunctionsProvider,
    public loadingCtrl: LoadingController) {
    this.image =  'https://develop.backendless.com/FAA68423-49CB-CE65-FF5B-CB0FC0C7B600/console/avpnlcmellcgdgcpfekyzsiwwrqxvypchbdj/files/view/logo_aqui.png';
  }

  logar() {
    if (this.user.email == '' || this.user.password == '') {
      this.functions.showToast('Email / senha não podem estar vazios!');
    } else {
      let load = this.loadingCtrl.create({
        content: "Logando, por favor aguarde..."
      }); 
      load.present();
      if (this.user.email.indexOf('@') == -1) { //Caso seja nome de usuário
        this.api.infoUserWhere(this.user.email).subscribe(res => {
          console.log(res);
          if (res.length == 0) 
            this.functions.mostraAlert('Erro', 'Email / senha inválidos');
          else {
            this.api.login(res[0].email, this.user.password).subscribe(res => {
              load.dismiss();
             localStorage.setItem("userToken", res["user-token"]); //Token para reqs posteriores
              this.navCtrl.setRoot(TabsPage);
        },
        Error => { //Login
          console.log(Error);
          load.dismiss();
          const message: string = this.functions.filtraErro(Error.error.code);
          this.functions.mostraAlert('Erro', message);
          });
          }
        },
        Error => { //InfoUser
          console.log(Error);
          load.dismiss();
          this.functions.mostraAlert('Erro', 'Usuário incorreto');
        });
      } else {
        this.api.login(this.user.email, this.user.password).subscribe(res => {
          load.dismiss();
         localStorage.setItem("userToken", res["user-token"]); //Token para reqs posteriores
          this.navCtrl.setRoot(TabsPage);
        },
        Error => { // Login
          console.log(Error);
          load.dismiss();
          const message: string = this.functions.filtraErro(Error.error.code);
          this.functions.mostraAlert('Erro', message);
        });
      }
    }
  }
}

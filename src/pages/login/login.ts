import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { TabsPage } from '../tabs/tabs';
import { CadastrarPage } from '../cadastrar/cadastrar';

import { FunctionsProvider } from '../../providers/functions/functions';
import { ApiProvider } from '../../providers/api/api';

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
  private formValida: FormGroup;
  constructor(public navCtrl: NavController,
    public api: ApiProvider,
    public alertCtrl: AlertController,
    public functions: FunctionsProvider,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder) {
    this.formValida = this.formBuilder.group({
      login: ['', Validators.required],
      senha: ['', Validators.required],
    });
    this.image = 'https://develop.backendless.com/FAA68423-49CB-CE65-FF5B-CB0FC0C7B600/console/avpnlcmellcgdgcpfekyzsiwwrqxvypchbdj/files/view/logo_aqui.png';
  }

  cadastrar() {
    this.navCtrl.push(CadastrarPage);
  }

  logar() {
    let load = this.loadingCtrl.create({
      content: "Logando, por favor aguarde..."
    }); load.present();
    this.api.login(this.user.email, this.user.password).subscribe(res => {
      load.dismiss();
      localStorage.setItem('userToken', res["user-token"]); //Token para reqs posteriores           
      localStorage.setItem('userId', res.objectId); // Id do usuário atual logado
      console.log("TOKEN DEPOIS DE LOGAR:" + localStorage.getItem("userToken"));
      this.navCtrl.setRoot(TabsPage);
    },
      Error => { //Login  
        console.log(Error);
        load.dismiss();
        const message: string = this.functions.filtraErro(Error.error.code);
        this.functions.mostraAlert('Erro', message);
      });
  }
}

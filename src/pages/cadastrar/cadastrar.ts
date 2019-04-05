import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';

/**
 * Generated class for the CadastrarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-cadastrar',
 	templateUrl: 'cadastrar.html',
 })

 export class CadastrarPage {
 	private user = {
 		email: 'a@a.com',
 		password: 'a',
 		name: '',
 		idade: '',
 		login: ''
 	}
 	private password2: string;

 	constructor(public navCtrl: NavController, public api: ApiProvider, public functions: FunctionsProvider) {

 	}

 	cadastrar() {
 		let filtroLogin: [] = this.user.email.split("@");
 		this.user.login = filtroLogin[0];
 		if (this.user.email == '' || this.user.password == '')
 			this.functions.showToast('Preencha todos os campos!');
 		else if (this.user.password != this.password2)
 			this.functions.showToast('As senhas não condizem!');
 		else {
 			this.api.cadastra(this.user).subscribe(res => {
 				this.functions.mostraAlert('Cadastro efetuado com sucesso!', 'Basta logar agora :D');
 				this.navCtrl.pop();
 			},
 			Error => {
 				console.log(Error);
 				const message = this.functions.filtraErro(Error.error.code);
 				this.functions.mostraAlert('Erro ao criar conta!', message);
 			});
 		}
 	}
 }

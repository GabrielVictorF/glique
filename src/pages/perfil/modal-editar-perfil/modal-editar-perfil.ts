import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { FunctionsProvider } from '../../../providers/functions/functions';
import { ApiProvider } from '../../../providers/api/api';

@Component({
	selector: 'modal-editar-perfil',
	templateUrl: 'modal-editar-perfil.html',
})

export class ModalEditarPerfilPage {
	public user = this.navParams.get('data');
	private password = {
		password: '',
		password2: ''
	};

	constructor(public navParams: NavParams, public viewCtrl: ViewController, 
		public functions: FunctionsProvider, public api: ApiProvider) {
	}

	public dismiss() {
		this.viewCtrl.dismiss();
	}

	public atualizar() {
		this.api.putAtualizaUsuario(this.user).subscribe(res => {
			this.functions.showToast('Dados de usuário atualizados com sucesso!');
			this.dismiss();
		}, Error => {
			let erro = this.functions.filtraErro(Error.error.code);
			this.functions.showAlert('Ops!', erro);
		});
	}
}

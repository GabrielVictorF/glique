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
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FunctionsProvider } from '../../providers/functions/functions';
import { ApiProvider } from '../../providers/api/api';

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
		res_antes: "",
    res_depois: "",
    quantidade: "",
		data: '',
    turno: 0,
    dia_semana: new Date()
	}

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public functions: FunctionsProvider, public api: ApiProvider) {
      var hora: any = new Date();
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

  private adicionar() {
    console.log(this.medicao);
      this.medicao.data = this.functions.toEpoch(this.medicao.data);
      this.medicao.dia_semana = new Date(this.medicao.data);
      this.medicao.dia_semana = this.medicao.dia_semana.getDay();
      this.api.postMedicao(this.medicao).subscribe(res => {
        console.log(res);
        this.medicao.data = "";
        this.functions.showToast('Medição adicionada com sucesso!');
      },
      Error => {
          this.functions.showToast('Erro ao adicionar medição, código: ' + Error.error.code);
          console.log(Error);
      });
  } 
//}
}

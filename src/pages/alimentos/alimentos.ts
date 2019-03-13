import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the AlimentosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alimentos',
  templateUrl: 'alimentos.html',
})
export class AlimentosPage {
	public categorias = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider) {
  	this.api.getPesquisaCat().subscribe(res => {
  		this.categorias = res;
  	})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlimentosPage');
  }

   getItems(ev: any) {
    let val = ev.target.value;
   	this.api.getPesquisaCat(val).subscribe(res => {
   		this.categorias = res;
   			console.log(this.categorias);
    });
  }
}

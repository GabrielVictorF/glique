import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DicasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dicas',
  templateUrl: 'dicas.html',
})
export class DicasPage {

  public ico = [{
    ico: 'arrow-down',
    descricao: 'Ver'
  }, {
    ico: 'arrow-down',
    descricao: 'Ver'
  },{
    ico: 'arrow-down',
    descricao: 'Ver'
  },{
    ico: 'arrow-down',
    descricao: 'Ver'
  }];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DicasPage');
  }

  show(help: number) {
    if (this.ico[help].ico == "arrow-down") {
      this.ico[help].ico = "arrow-up";
      this.ico[help].descricao = "Fechar";
    }
    else {
      this.ico[help].ico = "arrow-down";
      this.ico[help].descricao = "Mostrar";
    }
  }
}

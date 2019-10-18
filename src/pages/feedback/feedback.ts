import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';

/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  public message = {
    mensagem: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public api: ApiProvider, public functions: FunctionsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }

  postFeedback() {
    this.api.postFeedback(this.message).subscribe(() => this.functions.showAlert('Obrigado!', 'Seu feedback foi recebido, obrigado por contribuir com a continuação desse projeto!'));
  }
}

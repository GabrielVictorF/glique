import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';

import { FunctionsProvider } from '../../providers/functions/functions';
import { ApiProvider } from '../../providers/api/api';

import { LoginPage } from '../login/login';
import { DetalhePage } from '../detalhe/detalhe';

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
     res_antes: 1,
     res_depois: "",
     quantidade: "",
     data: '',
     turno: 0,
     dia_semana: 0
   }

   constructor(public navCtrl: NavController, public navParams: NavParams, 
     public functions: FunctionsProvider, public api: ApiProvider, public loadingCtrl: LoadingController,
     public alertCtrl: AlertController, public toastCtrl: ToastController) {
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

   adicionar() {
     let newTurno: string = "";
     switch (this.medicao.turno) {
       case 1:
       newTurno = "Café";
       break;
       case 2:
       newTurno = "Almoço";
       break;
       case 3:
       newTurno = "Jantar / Noite";
       break;
     }
     //Tela de confirmação desativada
     
     this.medicao.data = this.functions.toEpoch(this.medicao.data);
     let newDiaSemana = new Date(this.medicao.data);
     this.medicao.dia_semana = newDiaSemana.getDay();

     this.api.postMedicao(this.medicao).subscribe(res => {
       this.medicao.data = "";
       const toast = this.toastCtrl.create({
         message: "Medição adicionada com sucesso!",
         duration: 2000,
         showCloseButton: true,
         closeButtonText: 'Ver registro'
       });

       toast.onDidDismiss((data, role) => {
         if (role == "close")
           this.navCtrl.push(DetalhePage, {"itemSelecionado": res})
       });
       toast.present();
     },
     Error => {
       this.functions.showToast(Error.error.message);
       console.log(Error);
     });        
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
             localStorage.removeItem("userToken");
             this.navCtrl.setRoot(LoginPage);
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
   //}
 }

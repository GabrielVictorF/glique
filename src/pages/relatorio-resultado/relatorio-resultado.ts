import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';

import { DetalhePage } from '../detalhe/detalhe';
import { ResultadoPage } from '../resultado/resultado';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-relatorio-resultado',
  templateUrl: 'relatorio-resultado.html'
})

export class RelatorioResultadoPage {
  private data: any = [];
  private relatorio;
  protected funcao;
  protected qtdObj: any;
  private offset;
  private response: any = [];
  private ico = {
    ico: "arrow-down",
    descricao: "Mostrar"
  };
  public load;

  constructor(public api: ApiProvider, public navCtrl: NavController, public navParams: NavParams,
  public loadingCtrl: LoadingController, public alertCtrl: AlertController, public functions: FunctionsProvider) {
    this.resetaRelatorio();    
    this.funcao = this.navParams.get("funcao");
  }

  ionViewWillEnter() {
    this.load = this.loadingCtrl.create({
      content: "Obtendo"
    }); 
    this.offset = -100;
    this.response = [];
    this.load.present().then(() => {
      this.api.getQtdObjetos().subscribe(res => {
        this.qtdObj = res; 
        this.filtraFuncao();
        console.log(this.qtdObj);
      });
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

  filtraFuncao() {
    switch(this.funcao) {
      case 1:
      if (this.qtdObj > 0) {
        do {
          this.offset+=100;
          this.api.getMedicoes(this.offset).subscribe(res => {
            res.map(response => this.response.push(response))
            if (this.offset > this.qtdObj) {
              this.getSomenteMes(this.response);
            console.log(this.data);
          }
            console.log(this.response);
          }, Error => {
            console.log(Error);
            this.load.dismiss().then(() => this.alertCtrl.create({
              title: "Ops",
               message: "Erro ao obter dados",
               buttons:[{
                 text: "Ok"
               }]
            }))
          })
        } while (this.offset < this.qtdObj);  
      } else {
        this.load.dismiss();
      }
            
      break;
      case 2:
        if (qtdObj > 0) {
          do {
          this.offset+=100;
          this.api.getMedicoes(this.offset).subscribe(res => {
            if (res.length > 0) { // Caso obtenha dados
              res.map(response => this.response.push(response))
            if (this.offset > this.qtdObj) 
              this.getSomenteAno(this.response);
            }  
          },
          Error => {
            console.log(Error);
            this.load.dismiss().then(() => this.alertCtrl.create({
              title: "Ops",
               message: "Erro ao obter dados",
               buttons:[{
                 text: "Ok"
               }]
            }))
          })
        } while (this.offset < this.qtdObj);
      } else 
        this.load.dismiss();        
      break;
      case 3:
        var hoje = new Date();
        var formatado = {
          dia: hoje.getDate(),
          mes: hoje.getMonth(),
          ano: hoje.getFullYear()
        }
        let intervalo = {
          i1: new Date(),
          i2: new Date()
        };
        var newHoje: number = hoje.getDay();
        intervalo.i1 = new Date(formatado.ano, formatado.mes, formatado.dia - newHoje, 0,0,0);
        intervalo.i1 = this.functions.toEpoch(intervalo.i1);
        intervalo.i2 = new Date(formatado.ano, formatado.mes, (formatado.dia + (6 - newHoje)), 0,0,0)
        intervalo.i2 = this.functions.toEpoch(intervalo.i2)
   
          this.api.getSemana(intervalo.i1, intervalo.i2).subscribe(res => {
             this.data = res;
             this.load.dismiss().then(() => this.maiorMenor());
          });
    }
  }

  media() {
    let somaAntes = 0, somaDepois = 0, somaInsulina = 0;
    let length: number = this.data.length;
    for (let i = 0; i < length; i++) {
      somaAntes += this.data[i].resultado_antes;
      somaDepois += this.data[i].resultado_depois;
      somaInsulina += this.data[i].quantidade_insulina;    
    }  console.log(somaInsulina);
    this.relatorio.media.resultado_antes = somaAntes / length;
    this.relatorio.media.resultado_depois = somaDepois / length;
    this.relatorio.media.insulina = somaInsulina / length;
    this.relatorio.media.resultado_antes = parseInt(this.relatorio.media.resultado_antes);
    this.relatorio.media.resultado_depois = parseInt(this.relatorio.media.resultado_depois);
    this.relatorio.media.insulina = parseInt(this.relatorio.media.insulina);
    this.load.dismiss();
  }

  exibeMedia() {
     if (this.ico.ico == "arrow-down") {
      this.ico.ico = "arrow-up";
      this.ico.descricao = "Fechar";
    }
    else {
      this.ico.ico = "arrow-down";
      this.ico.descricao = "Mostrar";
    }
  }

  getSomenteMes(res) {
    this.data = [];
    let newData = {
      mes: '',
      ano: ''
    }
    let mesAtual: any = new Date();
    let responseCmp;
    newData.mes = mesAtual.getMonth() + 1;
    newData.ano = mesAtual.getFullYear();
    console.log(newData)
  
      res.map(response => {
        responseCmp = new Date(response.data);
        console.log(responseCmp.getMonth() + 1);
        if (((responseCmp.getMonth() + 1) == newData.mes) && (responseCmp.getFullYear() == newData.ano) ) {
          this.data.push(response); 
        } 
      });

      this.maiorMenor();
      
  }

  getSomenteAno(res) {
    this.data = [];
    let anoAtual: any = new Date();
    anoAtual = anoAtual.getFullYear();
    let responseCmp;
    
    res.map(response => {
        responseCmp = new Date(response.data);
        //console.log(responseCmp.getFullYear());
        if (responseCmp.getFullYear() == anoAtual) {
          this.data.push(response);
          console.log(this.data); 
        }
      });
    this.maiorMenor();
  }

  resetaRelatorio() {
    this.relatorio = {
      maior: -1, // Maior qtd de insulina injetada
      maiorObject: '', // Object do atr acima
      maiorAcucar: -1, // Maior nível de açúcar
      maiorAcucarObject: '', // Object do atr acima
      menorAcucar: 10000000, // Menor nível de açúcar 
      menorAcucarObject: '', // Object do atr acima
      turno: { // Quantidade de registros nos turnos 
        t1: 0,
        t2: 0,
        t3: 0
      },
      maisTurno: 0, // Turno com MAIOR número de registros
      menorTurno: 0, // T  urno com MENOR número de registros
      media:  {
        resultado_antes: 0,
        resultado_depois: 0,
        insulina: 0
      }
    }
  }

  maiorMenor() {
    this.resetaRelatorio();
    //Incrementa os turnos de acordo com os dados
    if (this.data.length > 0) {
       for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].turno == 1)
        this.relatorio.turno.t1++;
      else if (this.data[i].turno == 2)
        this.relatorio.turno.t2++;
      else
        this.relatorio.turno.t3++;

      //Define o MAIOR nível de açucar
      if (this.relatorio.maiorAcucar < this.data[i].resultado_antes) {
        this.relatorio.maiorAcucar = this.data[i].resultado_antes;
        this.relatorio.maiorAcucarObject = this.data[i];
      }
      if (this.relatorio.maiorAcucar < this.data[i].resultado_depois) {
        this.relatorio.maiorAcucar = this.data[i].resultado_depois;
        this.relatorio.maiorAcucarObject = this.data[i];
      }

      //Define o MENOR nível de açucar
      if (this.relatorio.menorAcucar > this.data[i].resultado_antes) {
        this.relatorio.menorAcucar = this.data[i].resultado_antes;
        this.relatorio.menorAcucarObject = this.data[i];
      }
      if (this.relatorio.menorAcucar > this.data[i].resultado_depois) {
        this.relatorio.menorAcucar = this.data[i].resultado_depois;
        this.relatorio.menorAcucarObject = this.data[i];
      }

      if (this.relatorio.maior < this.data[i].quantidade_insulina) {
        this.relatorio.maior = this.data[i].quantidade_insulina; //Define o maior nível de insulina registrado
        this.relatorio.maiorObject = this.data[i]; //Pega todo o objeto do maior nível de insulina
      }
    }

    //Define o turno com mais registros
    if(this.relatorio.turno.t1 > this.relatorio.turno.t2 && this.relatorio.turno.t1 > this.relatorio.turno.t3)
      this.relatorio.maisTurno = 1; 
    else if (this.relatorio.turno.t2 > this.relatorio.turno.t1 &&  this.relatorio.turno.t2 > this.relatorio.turno.t3)
      this.relatorio.maisTurno = 2;
    else 
      this.relatorio.maisTurno = 3; 

      //Define o turno com mais registros
    if(this.relatorio.turno.t1 < this.relatorio.turno.t2 && this.relatorio.turno.t1 && this.relatorio.turno.t3)
      this.relatorio.menorTurno = 1; 
    else if (this.relatorio.turno.t2 < this.relatorio.turno.t1 && this.relatorio.turno.t2 && this.relatorio.turno.t3)
      this.relatorio.menorTurno = 2;
    else
      this.relatorio.menorTurno = 3; 

      this.media();
    }  
}

  detalhe(tipo) {
    switch (tipo) {
      case 1:
        this.navCtrl.push(DetalhePage, {'itemSelecionado': this.relatorio.maiorObject});
        break;
      case 2:
        this.navCtrl.push(DetalhePage, {'itemSelecionado': this.relatorio.maiorAcucarObject});
        break;
      case 3:
         this.navCtrl.push(DetalhePage, {'itemSelecionado': this.relatorio.menorAcucarObject});
    }      
  }
}
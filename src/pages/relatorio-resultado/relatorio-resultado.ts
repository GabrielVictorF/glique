import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';

import { DetalhePage } from '../detalhe/detalhe';
import { ResultadoPage } from '../resultado/resultado';

@Component({
  selector: 'page-relatorio-resultado',
  templateUrl: 'relatorio-resultado.html'
})

export class RelatorioResultadoPage {
  private data: any = [];
  private relatorio;

  constructor(public api: ApiProvider, public navCtrl: NavController) {
    this.resetaRelatorio();
    this.api.getMedicoes(0).subscribe(res => {
      this.getSomenteMes(res);
      console.log(this.data);
    })
  }

  ionViewWillEnter() {
    this.api.getMedicoes(0).subscribe(res => {
      this.getSomenteMes(res);
      console.log(this.data);
    })
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
      menorTurno: 0 // Turno com MENOR número de registros
    }
  }

  maiorMenor() {
    this.resetaRelatorio();
    //Incrementa os turnos de acordo com os dados  
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
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ModalController, ViewController } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';

import { DetalhePage } from '../detalhe/detalhe';
import { ResultadoPage } from '../resultado/resultado';
import { LoginPage } from '../login/login';
import { ModalRelatorioPage } from './modal-relatorio/modal-relatorio';


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
  public getConcluido: boolean = false;

  constructor(public api: ApiProvider, public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public functions: FunctionsProvider,
    public modal: ModalController) {
    this.resetaRelatorio();
  }

  ionViewWillEnter(refreshEvent?) {
    this.funcao = this.navParams.get("funcao");
    this.offset = -100;
    this.response = [];
    this.api.getQtdObjetos().subscribe(res => {
      if (refreshEvent)
        refreshEvent.complete();
      this.qtdObj = res;
      this.filtraFuncao();
      console.log(this.qtdObj);
    });
  }

  filtraFuncao() {
    switch (this.funcao) {
      case 1: // Relatorio do mes
        this.getSomenteMes();
        break;
      case 2: // Relatório do ano
        this.getSomenteAno();
        break;
      case 3: // Relatório da semana
        this.getSomenteSemana();
    }
  }

  media() {
    let somaAntes = 0, somaDepois = 0, somaInsulina = 0;
    let length: number = this.data.length;
    for (let i = 0; i < length; i++) {
      somaAntes += this.data[i].resultado_antes;
      somaDepois += this.data[i].resultado_depois;
      somaInsulina += this.data[i].quantidade_insulina;
    } console.log(somaInsulina);
    this.relatorio.media.resultado_antes = somaAntes / length;
    this.relatorio.media.resultado_depois = somaDepois / length;
    this.relatorio.media.insulina = somaInsulina / length;
    this.relatorio.media.resultado_antes = parseInt(this.relatorio.media.resultado_antes);
    this.relatorio.media.resultado_depois = parseInt(this.relatorio.media.resultado_depois);
    this.relatorio.media.insulina = parseInt(this.relatorio.media.insulina);
    console.log(this.relatorio.media)
    this.getConcluido = true;
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

  getSomenteMes() { // Alterar para tratar no banco
    /*this.data = [];
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
      if (((responseCmp.getMonth() + 1) == newData.mes) && (responseCmp.getFullYear() == newData.ano)) {
        this.data.push(response);
      }
    }); */
    let load = this.loadingCtrl.create({
      content: 'Obtendo dados...'
    }); load.present();
    let hoje = new Date();
    let primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    let ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
    primeiroDia = this.functions.toEpoch(primeiroDia);
    ultimoDia = this.functions.toEpoch(ultimoDia);
    this.api.getMesEspecifico(primeiroDia, ultimoDia).subscribe(res => {
      this.getConcluido = true;
      load.dismiss();
      this.data = res;
      this.maiorMenor();
    }, Error => {
      this.functions.showAlert("Ops!", this.functions.filtraErro(Error.error.code));
    });
  }

  getSomenteAno() { // Alterar para tratar no banco
    /*this.data = [];
    let anoAtual: any = new Date();
    anoAtual = anoAtual.getFull Year();
    let responseCmp;

    res.map(response => {
      responseCmp = new Date(response.data);
      //console.log(responseCmp.getFullYear());
      if (responseCmp.getFullYear() == anoAtual) {
        this.data.push(response);
      }
    }); */

    let load = this.loadingCtrl.create({
      content: 'Obtendo dados'
    }); load.present();
    let hoje = new Date();
    let esteAno = new Date(hoje.getFullYear(), 0, 0);
    esteAno = this.functions.toEpoch(esteAno);
    console.log(esteAno)
    this.api.getAnoEspecifico(esteAno).subscribe(res => {
      load.dismiss();
      this.data = res;
      console.log("Tamanho da request:" + this.data.length)
      this.maiorMenor();
      this.media();
    }, Error => {
      this.functions.showAlert("Ops!", this.functions.filtraErro(Error.error.code));
    });
  }

  getSomenteSemana() {
    let load = this.loadingCtrl.create({
      content: 'Obtendo dados'
    }); load.present();

    let intervalo = this.functions.calculaEssaSemana();
    
    this.api.getSemana(intervalo.i1, intervalo.i2).subscribe(res => {
      load.dismiss();
      this.getConcluido = true;
      if (res.length > 0) {
        this.data = res;
        this.maiorMenor();
      }
      this.getConcluido = true;
    }, Error => {
      this.functions.showAlert("Ops!", this.functions.filtraErro(Error.error.code));
    });
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
      media: {
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
      for (let i = 0; i < this.data.length; i++) {
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
      this.media();
    }
  }

  detalhe(tipo) {
    switch (tipo) {
      case 1:
        this.navCtrl.push(DetalhePage, { 'itemSelecionado': this.relatorio.maiorObject });
        break;
      case 2:
        this.navCtrl.push(DetalhePage, { 'itemSelecionado': this.relatorio.maiorAcucarObject });
        break;
      case 3:
        this.navCtrl.push(DetalhePage, { 'itemSelecionado': this.relatorio.menorAcucarObject });
    }
  }

  openModal() {
    let modal = this.modal.create(ModalRelatorioPage, { "data": this.relatorio.turno });
    modal.present();
  }
}
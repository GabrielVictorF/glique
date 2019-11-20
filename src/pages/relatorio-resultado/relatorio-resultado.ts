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
    }, Error => {
      this.functions.showToast("Ops!" + this.functions.filtraErro(Error.error.code));
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

    let soma = 0;

    this.data.forEach(element => {
      soma += element.valor;
    });
    console.log('Soma')
    console.log(soma)
    this.relatorio.media = (soma / this.data.length).toFixed(1);
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
      this.getConcluido = true;
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
      menorAcucar: 10000, // Menor nível de açúcar 
      menorAcucarObject: '', // Object do atr acima
      /*turno: { // Quantidade de registros nos turnos 
        t1: 0, t2: 0, t3: 0,
        t4: 0, t5: 0, t6: 0
      }, */
      turno: [0, 0, 0, 0, 0, 0],
      media: 0,
      maisTurno: 0, // Turno com MAIOR número de registros
      menorTurno: 1000, // T  urno com MENOR número de registros
    }
  }

  maiorMenor() {
    this.resetaRelatorio();
    //Incrementa os turnos de acordo com os dados
    if (this.data.length > 0) {
      for (let i = 0; i < this.data.length; i++) {
        switch (this.data[i].turno) {
          case 1:
            this.relatorio.turno[0]++;
            break;
          case 2:
            this.relatorio.turno[1]++;
            break;
          case 3:
            this.relatorio.turno[2]++;
            break;
          case 4:
            this.relatorio.turno[3]++;
            break;
          case 5:
            this.relatorio.turno[4]++;
            break;
          case 6:
            this.relatorio.turno[5]++;
            break;
        }

        //Define o MAIOR nível de açucar
        if (this.relatorio.maiorAcucar < this.data[i].valor) {
          this.relatorio.maiorAcucar = this.data[i].valor;
          this.relatorio.maiorAcucarObject = this.data[i];
        }

        //Define o MENOR nível de açucar
        if (this.relatorio.menorAcucar > this.data[i].valor) {
          this.relatorio.menorAcucar = this.data[i].valor;
          this.relatorio.menorAcucarObject = this.data[i];
        }
      }
      this.media();
    }

    //Cálculo das medições com menos e mais registros
    this.relatorio.turno.forEach(element => {
      console.log('if' + this.relatorio.maisTurno + '<' + element);
      if (this.relatorio.maisTurno < element )
        this.relatorio.maisTurno = element;

      if (this.relatorio.menorTurno > element && element > 0)
        this.relatorio.menorTurno = element;
    });

    console.log(this.relatorio)
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
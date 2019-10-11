import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';

import { DetalhePage} from '../detalhe/detalhe';

import { LoginPage } from '../login/login';

@Component({
   selector: 'page-resultado',
   templateUrl: 'resultado.html'
   //styleUrls: [ './resultado.scss' ]
})

export class ResultadoPage {

  public data: any = []; //Dados a serem exibidos
  private getFeito: boolean = false; //Controle 
  private pesquisa = { //Ng-model dos filtros de pesquisa
    turno: 0,
    tipo: 0,
    altoBaixo: 0,
    data: '',
    diaSemana: -1
  }
  private ico = ["arrow-down", "arrow-up"];
  private date = {
  dia: 10,
  mes: 10, ano: 10
  }
  private quantidadeResultado;

  private funcao: number; //Função GET que deve ser executada no provider api, recebida via navParams
  private filtro: any; //Data(calendário) recebida via navParams
  private filtro2 = new Array(); //Filtro das opções: "TURNO" e "ALTOBAIXO"
  private offset = 0; //Paginação da busca
  private medias = {
    pre: 0,
    pos: 0,
    injetado: 0
  }; //Cálculo das médias da busca
  private loading; //LoadingController
  private cores = ["primary", "warning"];
  
  constructor(public api: ApiProvider, public navParams: NavParams, public navCtrl: NavController,
  public loadingCtrl: LoadingController, public functions: FunctionsProvider, public alertCtrl: AlertController) {
    this.funcao = this.navParams.get("funcao"); //Função a ser executada
    this.filtro = this.navParams.get("filtro"); // Data a ser pesquisada no Backendless
    this.getResultados();
  }

  /*ionViewWillEnter() {
    this.getResultados();
  } */

  filtraPesquisa() { // Pesquisa os filtros para serem inseridos no getResultados()
    if (this.pesquisa.turno > 0)
      this.filtro2.push("turno%20%3D%20" + this.pesquisa.turno);
    if (this.pesquisa.tipo > 0)
      this.filtro2.push("tipo%3D" + this.pesquisa.tipo);
    if (this.pesquisa.altoBaixo == 1)
      this.filtro2.push(encodeURIComponent("resultado_antes > 100"));
    else if (this.pesquisa.altoBaixo == 2)
      this.filtro2.push(encodeURIComponent("resultado_antes < 100 && resultado_antes > 80"));
    else if (this.pesquisa.altoBaixo == 3)
      this.filtro2.push(encodeURIComponent("resultado_antes < 80"));
      // if (this.pesquisa.mes != '')
      // this.filtro2.push(encodeURIComponent(""));
  } 

  getSomenteMes(res) {
    let tempData = [];
    let filtro = {
      mes: '',
      ano: ''
    }
    let responseCmp;
    filtro.mes = this.pesquisa.data.substring(5,7);
    filtro.ano = this.pesquisa.data.substring(0, 4);

    console.log(filtro);
      res.map(response => {
        responseCmp = new Date(response.data);
        if (((responseCmp.getMonth() + 1) == filtro.mes) && (responseCmp.getFullYear() == filtro.ano) ) {
          tempData.push(response); 
        } 
      });
      if (tempData.length > 0) {
        if (this.pesquisa.diaSemana > -1) {
          this.filtroDiaSemana(tempData);
      }  else {
        this.data = tempData;
      }  
    }   
  }

  filtroDiaSemana(res) {
    let responseNew: any;
    res.map(response => {
    responseNew = new Date(response.data);
      if (responseNew.getDay() == this.pesquisa.diaSemana) {
        this.data.push(response);
      }
    });
  }

  getResultados(refreshEvent?) {
    this.loading = this.loadingCtrl.create({ //Loading do push dos resultados
      content: 'Obtendo resultados...',
    }); this.loading.present();

     this.offset = 0;
     this.filtro2 = new Array();

     switch(this.funcao) { //Todas as medições
      case 1:
       this.filtraPesquisa();
       this.data = [];
        this.api.getQuantidadeObj().subscribe(res => {
          this.quantidadeResultado = res; 
        });
        this.api.getMedicoes(this.offset, this.filtro2).subscribe(res => {
          this.getFeito = true;
          if (refreshEvent)
            refreshEvent.complete();
          this.loading.dismiss();
          if (this.pesquisa.data != '') { //Caso seja inserida uma data no filtro
            this.getSomenteMes(res);
          } else {
            this.filtroDiaSemana(res);
          } if (this.pesquisa.data == "" && this.pesquisa.diaSemana < 0) {
            console.log("ATRIBUIDO")
            this.data = res;
          }
          if (this.data.length > 0)
            this.calculaMedia();
        }, Error => {
          let erro = this.functions.filtraErro(Error.error.code);
          this.functions.showAlert("Ops!", erro);
          this.loading.dismiss();
        });
      break;
      case 2: // Medições da semana
        let intervalo = this.functions.calculaEssaSemana();
        this.api.getQuantidadeObjSemana(intervalo.i1, intervalo.i2).subscribe(res => {
          this.quantidadeResultado = res;
        })
        this.api.getSemana(intervalo.i1, intervalo.i2).subscribe(res => {
          this.data = res;
          if (this.data.length > 0)
            this.calculaMedia();
          this.loading.dismiss();
        });
        break;
        case 3: //Medições HOJE
        case 4: //Medições dia específico DESATIVAR??????????
        this.api.getQuantidadeObjDia(this.functions.toEpoch()).subscribe(res => {
          this.quantidadeResultado = res;
        });
        this.filtro2.push("data%3D" + this.filtro);
        this.filtraPesquisa(); 
        this.data = [];
        this.api.getPesquisa(this.filtro2, this.offset).subscribe(res => {          this.getFeito = true;
          console.log(res);
          if (refreshEvent)
            refreshEvent.complete();
          this.loading.dismiss();
          if (this.pesquisa.data != '') { //Caso seja inserida uma data no filtro
            this.getSomenteMes(res);
          } else 
            this.data = res;
          if (this.data.length > 0)
            this.calculaMedia();
        }, 
        Error => {
          //this.loading.dismiss();
          this.functions.showToast("Erro ao obter dados");
        });
      break;
    }
  }

  resetCampos() {
    this.pesquisa.turno = 0;
    this.pesquisa.altoBaixo = 0;
    this.pesquisa.data = "";
    this.pesquisa.diaSemana = -1;
    this.pesquisa.tipo = 0;
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {

      switch(this.funcao) {
        case 1:
          this.offset += 10;
          console.log(this.offset);
          this.api.getMedicoes(this.offset, this.filtro2).subscribe(res => {
          if (this.pesquisa.data != '') { //Caso seja inserida uma data no filtro
            this.getSomenteMes(res);
          } else 
            res.map(res => this.data.push(res));
            if (this.data.length > 0)
              this.calculaMedia();
            infiniteScroll.complete();
          });
        break;
        case 2:
          this.offset += 10;
          let intervalo = this.functions.calculaEssaSemana();
        this.api.getSemana(intervalo.i1, intervalo.i2).subscribe(res => {
          this.data = res;
          infiniteScroll.complete();
        });
          break;
        case 3:
        case 4:
          this.offset += 10;
          this.api.getPesquisa(this.filtro2, this.offset).subscribe(res => {
            if (this.pesquisa.data != '') { //Caso seja inserida uma data no filtro
              this.getSomenteMes(res);
            } else 
            res.map(res => this.data.push(res));
            if (this.data.length > 0)
              this.calculaMedia();
            infiniteScroll.complete();
          });
          break;
      }
      console.log('Async operation has ended');
    });
  }

  public detalheItem(item) {
    this.navCtrl.push(DetalhePage, {'itemSelecionado': item});
  }

  private calculaMedia() { //Falta otimizar desempenho
    let soma = {
      pre: 0,
      pos: 0,
      injetado: 0
    };
    let length: number = this.data.length;

    for (let i = 0; i < length; i++) {
      soma.pre += this.data[i].resultado_antes;
      soma.pos += this.data[i].resultado_depois;
      soma.injetado += this.data[i].quantidade_insulina;
    } 
    this.medias.pre = soma.pre / length;
    this.medias.pos = soma.pos / length;
    this.medias.injetado = soma.injetado / length;
  }
}
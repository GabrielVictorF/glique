import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController, NavController } from 'ionic-angular';


import { LoginPage } from '../../pages/login/login';
import { ApiProvider } from '../api/api';
import { SentryError } from '@sentry/utils';
import * as Sentry from '@sentry/browser';

@Injectable()
export class FunctionsProvider {
  private monthNames = ["Janeiro, Fevereiro, Março, Abril, Maio, Junho, Julho, Agosto, Setembro, Outubro, Novembro, Dezembro"];
  private REST_API = "https://api.backendless.com/8A6BC524-0A01-1D21-FF22-34BAD81EED00/17B5D094-F4D9-1D4D-FF3B-7BC9768DB900";

  constructor(public http: HttpClient, public toastCtrl: ToastController,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    console.log('Hello FunctionsProvider Provider');
  }

  public showSentryReportDialog() {
    let options = {
      lang: 'pt-br',
      title: 'Suporte ao usuário',
      subtitle: 'Nos conte o que aconteceu',
      subtitle2: '',
      labelName: 'Seu nome',
      labelEmail: 'Seu e-mail',
      labelComments: 'O que aconteceu?',
      labelClose: 'Fechar',
      labelSubmit: 'Enviar',
      errorGeneric: 'Ocorreu um erro',
      eventId: localStorage.getItem('error_event_id'),
      errorFormEntry: 'Todos os campos precisam ser preenchidos',
      successMessage: 'Seu report foi enviado a equipe de suporte, favor aguardar para o problema ser solucionado.'
    }
    console.log("CALLLLLLLLLLLLLLLLLLLLLLLLLLLLLlll")
    Sentry.showReportDialog(options);
}

  public toEpoch(dataHuman ?: any): any { //Transforma uma data pro meu formato
  console.log(dataHuman)               //Caso não receba nada por param ele pega do dia atual
  let data: any = {};
  if (dataHuman) {
    let date = new Date(dataHuman);
    data.ano = date.getFullYear(),
      data.mes = date.getMonth(),
      data.dia = date.getDate() + 1
  }
  else {
    let date = new Date();
    data.ano = date.getFullYear(),
      data.mes = date.getMonth(),
      data.dia = date.getDate()
  }
  let dataNew = new Date(data.ano, data.mes, data.dia, 0, 0, 0);
  let formatado = dataNew.getTime();
  console.log(formatado);
  return formatado;
}

filtraErro(erroCode) {
  switch (erroCode) {
    case 999:
      return 'Limite de requisições por segundo exaurido';
    //Data service
    case 1000:
      return 'ID de entidade não encontrado';
    case 1037:
      return 'Property doesnt exist';
    //User Servicel
    case 3000:
      return 'Esta conta foi desabilitada';
    case 3002:
      return 'Esta conta já está logada em outro dispositivo.'
    case 3003:
      return 'Email / senha inválidos';
    case 3006:
      return 'Email / senha não podem estar vazios';
    case 3033:
      return 'Login ja existente!';
    case 3036:
      return '';
    case 3040:
      return 'Insira um e-email válido';
    case 3044:
      return 'Não foi possível logar. Múltiplos logins detectados. Favor desconectar sua conta do outro dispositivo.'
    case 3064:
      return 'Sua sessão expirou, por favor logue novamente.'
    case 3090:
      return 'Conta desativada, contacte um administrador';
    default:
      return 'Erro desconhecido, favor tentar novamente';
  }
}

  public showToast(message: string) {
  const toast = this.toastCtrl.create({

    message: message,
    duration: 2000,
    showCloseButton: true,
    closeButtonText: 'OK'
  });

  toast.present();
}

  public showAlert(title: string, message: string) {
  const alert = this.alertCtrl.create({
    title: title,
    message: message,
    buttons: [{
      text: 'OK'
    }]
  });
  alert.present();
}

  public dateToEpoch() {
  let diaHoje = new Date();
  console.log(diaHoje);
  let data: any = {
    month: diaHoje.getMonth() + 1,
    day: diaHoje.getDate(),
    year: diaHoje.getFullYear()
  }

  data.month = "0" + data.month;
  data.year = data.year;

  if (data.day < 10)
    data.day = "0" + data.day;
  let dataFormatada = data.year + "-" + data.month + "-" + data.day;
  console.log(dataFormatada);
  return dataFormatada;
}

mostraAlert(title: string, message: string) {
  const alert = this.alertCtrl.create({
    title: title,
    message: message,
    buttons: ['OK']
  });
  alert.present();
}

  public calculaEssaSemana() {
  let hoje = new Date();
  let formatado = {
    dia: hoje.getDate(),
    mes: hoje.getMonth(),
    ano: hoje.getFullYear()
  }
  let intervalo = {
    i1: new Date(),
    i2: new Date()
  };
  let newHoje: number = hoje.getDay();
  intervalo.i1 = new Date(formatado.ano, formatado.mes, formatado.dia - newHoje, 0, 0, 0);
  intervalo.i1 = this.toEpoch(intervalo.i1);
  intervalo.i2 = new Date(formatado.ano, formatado.mes, (formatado.dia + (6 - newHoje)), 0, 0, 0)
  intervalo.i2 = this.toEpoch(intervalo.i2);
  return intervalo;
}

  public formataData(tipo: number, data: Date) {
  data = new Date(data);

  switch (tipo) {
    case 1:
      return data.getDate();
    case 2:
      switch (data.getMonth()) {
        case 0:
          return "Janeiro";
        case 1:
          return "Fevereiro";
        case 2:
          return "Março";
        case 3:
          return "Abril";
        case 4:
          return "Maio";
        case 5:
          return "Junho";
        case 6:
          return "Julho";
        case 7:
          return "Agosto";
        case 8:
          return "Setembro";
        case 9:
          return "Outubro";
        case 10:
          return "Novembro"
        case 11:
          return "Dezembro";
      }
    case 3:
      return data.getFullYear();
  }
}
}

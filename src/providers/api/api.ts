import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medicoes } from '../../models/medicoes';
import { FunctionsProvider } from '../functions/functions';
import { LoginPage } from '../../pages/login/login';
import { LoadingController, AlertController } from 'ionic-angular';

@Injectable()
export class ApiProvider {
  private APP_ID: string;
  private API_KEY: string;
  private URL: string;
  private REST_API: string;
  private httpOptions = ({
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'user-token': localStorage.getItem("userToken") // Token gerado ao usuário logar
    })
  });
  private httpOptionsNoToken = ({
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  });

  constructor(public http: HttpClient, public functions: FunctionsProvider, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
    this.APP_ID = "8A6BC524-0A01-1D21-FF22-34BAD81EED00";
    this.API_KEY = "17B5D094-F4D9-1D4D-FF3B-7BC9768DB900";
    this.URL = "https://api.backendless.com";
    this.REST_API = `${this.URL}/${this.APP_ID}/${this.API_KEY}`;
  }

  public getPesquisaCat(pesquisa?): any { //Token posterior
    let url;
    if (pesquisa) { // Caso tenha termo de pesquisa
      //let encoded = "?where=nome%20LIKE%20'%25" + pesquisa + "%25'";
      let encoded = encodeURI(`?where=nome LIKE '%${pesquisa}%'`);
      url = `${this.REST_API}/data/categorias${encoded}`;
    } else // Caso seja só um get all na tabela
      url = `${this.REST_API}/data/categorias`;
    return this.http.get(url);
  }

  public login(email: string, password: string): any {
    const url = this.REST_API + '/users/login';

    let body = {
      login: email,
      password: password
    }
    return this.http.post(url,
      body, this.httpOptionsNoToken);
  }

  public cadastra(user): any {
    const url = this.REST_API + '/users/register';
    let body = {
      email: user.email,
      password: user.password, //transform into string
      nome: user.name,
      login: user.login,
      cargo: user.cargo,
      idade: parseInt(user.idade)
    }
    return this.http.post(url, body, this.httpOptionsNoToken);
  }

  public validaToken() {
    const url = `${this.REST_API}/users/isvalidusertoken/${localStorage.getItem("userToken")}`;
    return this.http.get(url);
  }

  public logout() {
    const url = `${this.REST_API}/users/logout`;
    return this.http.get(url, this.httpOptionsNoToken);
  }

  public getQuantidadeObj() { //Retorna a quantidade de objetos na tabela medicoes
    let url = `${this.REST_API}/data/medicoes/count`;
    return this.http.get(url, this.httpOptions);
  }

  public getQuantidadeObjDia(data: any) { //Retorna a quantidade de objetos de hoje na tabela medicoes
    let url = `${this.REST_API}/data/medicoes/count?where=data%3D${data}`;
    return this.http.get(url, this.httpOptions);
  }

  public getQuantidadeObjSemana(inicio, fim) {
    let url = `${this.REST_API}/data/medicoes/count?where=data>=${inicio}&&data<=${fim}`;
    return this.http.get(url, this.httpOptions);
  }

  public getMedicoes(offset: number, filtros?): any {
    let where = "";
    if (filtros && filtros.length > 0) { // Caso venha com filtros
      where += `?offset=${offset}&where=`;
      filtros.forEach(function (res, index) {
        where += res;
        if (filtros.length > 0 && filtros.length - index > 1) // Caso tenha mais de um filtro E NÂO seja o último filtro a ser tratado
          where += "%26%26";
      });

      where += `&pageSize=10&sortBy=data%20desc&offset=${offset}`;
    } else {
      where += `?pageSize=10&sortBy=data%20desc&offset=${offset}`;
    }

    const url = `${this.REST_API}/data/medicoes${where}`;
    return this.http.get<Medicoes>(url, this.httpOptions);
  }

  public getMedicoesTurnoEspecifico(turno: any, offset: any): any { // SEM USO 19/09/2019
    let filtro = `&&pageSize=10&sortBy=data%20desc&where=turno%3D${turno}&offset=${offset}`;
    const url = `${this.REST_API}/data/medicoes${filtro}`;
    return this.http.get<Medicoes>(url);
  }

  public postMedicao(medicao): any {
    const url = `${this.REST_API}/data/medicoes`;
    let body = { // Trata os dados antes do POST
      resultado_antes: parseInt(medicao.res_antes),
      resultado_depois: parseInt(medicao.res_depois),
      quantidade_insulina: parseInt(medicao.quantidade),
      data: medicao.data, 
      turno: parseInt(medicao.turno),
      tipo: parseInt(medicao.tipo)
    }
    return this.http.post(url, body, this.httpOptions);
  } 

  public putMedicao(medicao): any {
    const objectId = medicao.objectId;
    const url = `${this.REST_API}/data/medicoes/${objectId}`;
    let body = {
      resultado_antes: parseInt(medicao.resultado_antes),
      resultado_depois: parseInt(medicao.resultado_depois),
      quantidade_insulina: parseInt(medicao.quantidade_insulina),
      data: medicao.data,
      turno: parseInt(medicao.turno)
    }
    return this.http.put(url, body, this.httpOptions);
  }

  public deleteMedicao(objectId): any {
    const url = `${this.REST_API}/data/medicoes/${objectId}`;
    return this.http.delete(url, this.httpOptions);
  }

  public getPesquisa(filtros, offset): any { // Traz resultados de acordo com a data solicitada
    let where: string = `?offset=${offset}&where=`;
    filtros.forEach(function (res, index) {
      where += res;
      if (filtros.length > 0 && filtros.length - index > 1) // Caso tenha mais de um filtro E NÂO seja o último filtro a ser tratado
        where += "%26%26";
    });

    const url = `${this.REST_API}/data/medicoes${where}`;
    return this.http.get(url, this.httpOptions);
  }

  public getMesEspecifico(primeiroDia, ultimoDia) {
    let where: string = `?where=data>=${primeiroDia}&&data<=${ultimoDia}`;
    where = encodeURI(where);
    const url = `${this.REST_API}/data/medicoes${where}`;
    return this.http.get(url, this.httpOptions);
  }

  public getAnoEspecifico(anoAtual) {
    let where: string = `?where=data>${anoAtual}`;
    where = encodeURI(where);
    const url = `${this.REST_API}/data/medicoes${where}&pageSize=10`;
    return this.http.get(url, this.httpOptions);
  }

  public getSemana(inicio: any, fim: any): any {
    const url: string = encodeURI(`${this.REST_API}/data/medicoes?where=data>=${inicio}&&data<=${fim}&pageSize=10`);
    return this.http.get(url, this.httpOptions);
  }

  public getQtdObjetos() {
    const url = `${this.REST_API}/data/medicoes/count`;
    return this.http.get(url, this.httpOptions);
  }

  public getInfoUser() {
    const url = `${this.REST_API}/data/users/${localStorage.getItem("userId")}`;
    return this.http.get(url, this.httpOptions);
  }
}
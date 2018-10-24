import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medicoes } from '../../models/medicoes';
import { FunctionsProvider } from '../functions/functions';
import { LoginPage } from '../../pages/login/login';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  private APP_ID: string;
  private API_KEY: string;
  private URL: string;
  private REST_API: string;

  constructor(public http: HttpClient, public functions: FunctionsProvider) {
    this.APP_ID = "8A6BC524-0A01-1D21-FF22-34BAD81EED00";
    this.API_KEY = "17B5D094-F4D9-1D4D-FF3B-7BC9768DB900";
    this.URL = "https://api.backendless.com";
    this.REST_API = this.URL + '/' + this.APP_ID + '/' + this.API_KEY;
	}

   public infoUserWhere(user): any {
    var encoded = encodeURIComponent(user);
    const where = "?where=name%3D'" + encoded + "'";
    console.log(where);
    const urlBuscaUser = this.REST_API + '/data/Users' + where;
    console.log(urlBuscaUser);

    return this.http.get(urlBuscaUser);
  }

  public login(email: string, password: string): any {
    const url = this.REST_API + '/users/login';
    const httpOptions = ({
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
    
    let body = {
    	login: email,
    	password: password
    }
  	return this.http.post(url,
  		body, httpOptions);
	}

  public validaToken() {
    const url = this.REST_API + '/users/isvalidusertoken/' + localStorage.userToken;
    return this.http.get(url);
  }

  public logout() {
    const url = this.REST_API + '/users/logout';
    const httpOptions = ({
      headers: new HttpHeaders({
        'user-token': localStorage.userToken
      })
    });
    
    return this.http.get(url, httpOptions);
  }

  public getMedicoes(offset: number, filtros?: []): any {
    let where = "";
    if (filtros && filtros.length > 0) {
      console.log("COM FILTRO");
      where += "?offset=" + offset + "&where=";
      filtros.forEach(function (res, index){
      where += res;
      if (filtros.length > 0 && filtros.length - index > 1 ) // Caso tenha mais de um filtro E NÂO seja o último filtro a ser tratado
      where += "%26%26";
    });
 
      where += "&pageSize=100&sortBy=data%20desc&offset=" + offset;
    } else {
      where += "?pageSize=100&sortBy=data%20desc&offset=" + offset;
    }
    
    const httpOptions = ({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'user-token': localStorage.getItem("userToken")
      })
    });

    const url = this.REST_API + '/data/medicoes' + where;
    console.log(url);
  	return this.http.get<Medicoes>(url, httpOptions);
  }
  
  public getMedicoesTurnoEspecifico(turno: any, offset: any): any {
    let filtro = "&&pageSize=15&sortBy=data%20desc&where=turno%3D" + turno + "&offset=" + offset;
    const url = this.REST_API + "/data/medicoes" + filtro;
  	return this.http.get<Medicoes>(url);
  }

  public postMedicao(medicao): any {
    const url = this.REST_API + "/data/medicoes";
    const httpOptions = ({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'user-token': localStorage.getItem("userToken")
      })
    });
    let body = {
      resultado_antes: parseInt(medicao.res_antes),
      resultado_depois: parseInt(medicao.res_depois),
      quantidade_insulina: parseInt(medicao.quantidade),
      data: medicao.data,
      turno: parseInt(medicao.turno),
      dia_semana: parseInt(medicao.dia_semana)
    }
    return this.http.post(url, body, httpOptions);
  }

  public putMedicao(medicao): any {
    const objectId = medicao.objectId;
    const url = this.REST_API + "/data/medicoes/" + objectId;
    const httpOptions = ({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'user-token': localStorage.getItem("userToken")
      })
    });
    let body = {
      resultado_antes: parseInt(medicao.resultado_antes),
      resultado_depois: parseInt(medicao.resultado_depois),
      quantidade_insulina: parseInt(medicao.quantidade_insulina),
      data: medicao.data,
      turno: parseInt(medicao.turno)
    }
    return this.http.put(url, body, httpOptions);
  }

  public deleteMedicao(objectId): any {
    const url = this.REST_API + "/data/medicoes/" + objectId;
    const httpOptions = ({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'user-token': localStorage.getItem("userToken")
      })
    });
    return this.http.delete(url, httpOptions);
  }

  public getPesquisa(filtros: [], offset): any { // Traz resultados de acordo com a data solicitada
    let where: string = "?offset=" + offset + "&where=";
    const httpOptions = ({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'user-token': localStorage.getItem("userToken")
      })
    });

    filtros.forEach(function (res, index){
      where += res;
      if (filtros.length > 0 && filtros.length - index > 1 ) // Caso tenha mais de um filtro E NÂO seja o último filtro a ser tratado
      where += "%26%26";
    });
 
    const url = this.REST_API + '/data/medicoes' + where;
    console.log(url);
    return this.http.get(url, httpOptions); 
  }
  
  public getMesEspecifico(offset) {
    let where: string = "?offset=" + offset + "&where";
  }
}
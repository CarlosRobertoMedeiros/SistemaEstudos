import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';

import * as moment from 'moment';




@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  lancamentosUrl:String;
  

  constructor(private http:HttpClient) { 
    this.lancamentosUrl = `${environment.apiUrl}/api/lancamentos`;
  }

  relatorioLancamentosPorPessoa(inicio:Date, fim:Date):Promise<any>{
    
    let params = new HttpParams();

    params = params.set('inicio',moment(inicio).format('YYYY-MM-DD'));
    params = params.set('fim',moment(fim).format('YYYY-MM-DD'));

    console.log("Aqui => "+`${this.lancamentosUrl}/relatorios/por-pessoa`);
    return this.http.get(`${this.lancamentosUrl}/relatorios/por-pessoa`,{params, responseType: 'blob'})
      .toPromise()
      .then(response =>response);
  }

}

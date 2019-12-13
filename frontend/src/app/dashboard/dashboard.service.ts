import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';

import * as moment from 'moment';
import { Lancamento } from '../core/model';



@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  lancamentosUrl :string;
  
  constructor(private http: HttpClient ) { 
    this.lancamentosUrl = `${environment.apiUrl}/api/lancamentos`
  };


  lancamentosPorCategoria():Promise<any>{
    return this.http.get<any>(`${this.lancamentosUrl}/estatisticas/por-categoria`)
      .toPromise()
      .then(reponse => reponse as Lancamento);
  }

  lancamentosPorDia():Promise<any>{
    return this.http.get<any>(`${this.lancamentosUrl}/estatisticas/por-dia`)
      .toPromise()
      .then(response => {
                const dados = response;
                this.converterStringsParaDatas(dados);
                return dados; 
           })
  }

  private converterStringsParaDatas(dados:Array<any>){
    
    for (const dado of dados){
      dado.dia = moment(dado.dia,'YYYY-MM-DD').toDate();
    }

  }

}



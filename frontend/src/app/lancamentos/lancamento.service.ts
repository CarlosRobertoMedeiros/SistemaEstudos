import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import * as moment from 'moment';
import { promise } from 'protractor';
import { Lancamento } from '../core/model';


export class LancamentoFiltro{
    descricao:string;
    dataVencimentoInicio:Date;
    dataVencimentoFim:Date;
    pagina = 0;
    itensPorPagina =5;
}


@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = "http://localhost:9000/api/lancamentos";
  constructor(private http: HttpClient) {}

  pesquisar(filtro:LancamentoFiltro):Promise<any>{

    let headers = new HttpHeaders().append('Authorization','Basic YWRtaW46YWRtaW4=');
    let params = new HttpParams();

    params = params.set('page',filtro.pagina.toString());   
    params = params.set('size',filtro.itensPorPagina.toString());   
    
    
    if (filtro.descricao){
      params = params.set('descricao',filtro.descricao);   
    }

    if (filtro.dataVencimentoInicio){
      params = params.set('dataVencimentoDe',  moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));   
    }

    if (filtro.dataVencimentoFim){
      params = params.set('dataVencimentoAte',  moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));   
    }


    //Retornando o Objeto Paginado, devolvendo informações de paginação
    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers, params })
      .toPromise()
      .then(response => {
        const lancamentos = response['content']
        const resultado = {
          lancamentos,
          total:response['totalElements']
        }

       return resultado;
      });
  }

  excluir(codigo:number):Promise<void>{
    
    let headers = new HttpHeaders().append('Authorization','Basic YWRtaW46YWRtaW4=');
    let params = new HttpParams();

    return this.http.delete(`${this.lancamentosUrl}/${codigo}`,{headers})
      .toPromise()
      .then(()=>null);
  }

  adicionar(lancamento:Lancamento):Promise<Lancamento>{
    let headers = new HttpHeaders()
      .append('Authorization','Basic YWRtaW46YWRtaW4=')
      .append('Content-Type','application/json');

      return this.http.post(this.lancamentosUrl,JSON.stringify(lancamento) ,{headers})
        .toPromise()
        .then();

  }

  atualizar(lancamento:Lancamento):Promise<Lancamento>{
    return null;
  }

  buscarPorCodigo(codigo:number):Promise<Lancamento>{
    return null;
  }

  private converterStringsParaDatas(lancamentos:Lancamento[]){
    
  }



}

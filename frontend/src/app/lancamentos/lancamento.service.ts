import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import * as moment from 'moment';
import 'moment/locale/pt-br'
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
    
    return this.http.get<any>(`${this.lancamentosUrl}?resumo`, {params})
      .toPromise()
      .then(response =>{
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
        .then(response =>{
          const lancamentoInserido = response as Lancamento;
          this.converterStringsParaDatas([lancamentoInserido]);
          return lancamentoInserido;
        });

  }

  atualizar(lancamento:Lancamento):Promise<Lancamento>{
    
    let headers = new HttpHeaders()
      .append('Authorization','Basic YWRtaW46YWRtaW4=')
      .append('Content-Type','application/json');
      
      return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}`,JSON.stringify(lancamento),{headers})
        .toPromise()
        .then(response =>{
          const lancamentoAlterado = response as Lancamento;
          this.converterStringsParaDatas([lancamentoAlterado]);
          return lancamentoAlterado;
        });
  }

  buscarPorCodigo(codigo:number):Promise<Lancamento>{
    let headers = new HttpHeaders()
      .append('Authorization','Basic YWRtaW46YWRtaW4=');

    return this.http.get(`${this.lancamentosUrl}/${codigo}`,{headers})
      .toPromise()
      //.then();
      .then(response =>{
        const lancamento = response as Lancamento;
        this.converterStringsParaDatas([lancamento]);
        return lancamento;
        });
  }

  
  private converterStringsParaDatas(lancamentos:Lancamento[]){
      for (const lancamento of lancamentos) {
        lancamento.dataVencimento = moment(lancamento.dataVencimento,
        'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento,
          'YYYY-MM-DD').toDate(); 
      }
    } 
  }
}



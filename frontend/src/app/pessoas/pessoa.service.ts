import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { Pessoa } from '../core/model';


export class PessoaFiltro{
  nome:string;
  pagina = 0;
  itensPorPagina =5;
}


@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = "http://localhost:9000/api/pessoas";
  
  constructor(private http:HttpClient) { }

  pesquisar(filtro:PessoaFiltro):Promise<any>{

    let params = new HttpParams();

    params = params.set('page',filtro.pagina.toString());   
    params = params.set('size',filtro.itensPorPagina.toString());   

    if (filtro.nome){
      params = params.set('nome',filtro.nome);   
    }

    return this.http.get<any>(`${this.pessoasUrl}?listar` , {params})
      .toPromise()
      .then(response =>{
         const pessoas = response['content']
         const resultado = {
           pessoas,
           total:response['totalElements']
        }
        return resultado;
      });
  }

  listarTodas():Promise<any>{
    let headers = new HttpHeaders().append('Authorization','Basic YWRtaW46YWRtaW4=');

    return this.http.get(this.pessoasUrl, {headers})
      .toPromise()
      .then();
  }

  excluir(codigo:any):Promise<void> {
    
    let headers = new HttpHeaders().append('Authorization','Basic YWRtaW46YWRtaW4=');
    
    return this.http.delete(`${this.pessoasUrl}/${codigo}` , {headers})
      .toPromise()
      .then(()=>null);
  }

  mudarStatus(codigo:any,novoStatus:boolean):Promise<void>{

      let headers = new HttpHeaders()
        .append('Authorization','Basic YWRtaW46YWRtaW4=')
        .append('Content-Type','application/json');  
      
      return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, novoStatus , {headers})
        .toPromise()
        .then(()=>null);
  }

  adicionar(pessoa:Pessoa):Promise<Pessoa>{
    let headers = new HttpHeaders()
      .append('Authorization','Basic YWRtaW46YWRtaW4=')
      .append('Content-Type','application/json');

      return this.http.post(this.pessoasUrl,JSON.stringify(pessoa) ,{headers})
        .toPromise()
        .then();
  }

  buscarPorCodigo(codigo:number):Promise<Pessoa>{
      let headers = new HttpHeaders()
        .append('Authorization','Basic YWRtaW46YWRtaW4=');

        return this.http.get(`${this.pessoasUrl}/${codigo}`, {headers})
          .toPromise()
          .then();
  }

  atualizar(pessoa:Pessoa):Promise<Pessoa>{
    
    let headers = new HttpHeaders()
      .append('Authorization','Basic YWRtaW46YWRtaW4=')
      .append('Content-Type','application/json');
      
      return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`,JSON.stringify(pessoa),{headers})
        .toPromise()
        .then();
  }

}

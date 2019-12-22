import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { Pessoa, Estado, Cidade } from '../core/model';
import { environment } from 'src/environments/environment';


export class PessoaFiltro{
  nome:string;
  pagina = 0;
  itensPorPagina =5;
}


@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl :string;
  cidadesUrl :string;
  estadosUrl :string;
  
  constructor(private http:HttpClient) { 
    this.pessoasUrl = `${environment.apiUrl}/api/pessoas`;
    this.estadosUrl = `${environment.apiUrl}/api/estados`;
    this.cidadesUrl = `${environment.apiUrl}/api/cidades`;
  }

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
     return this.http.get(this.pessoasUrl)
      .toPromise()
      .then();
  }

  excluir(codigo:any):Promise<void> {
    
     return this.http.delete(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(()=>null);
  }

  mudarStatus(codigo:any,novoStatus:boolean):Promise<void>{

    let headers = new HttpHeaders().append('Content-Type','application/json');
    
      return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, novoStatus, {headers})
        .toPromise()
        .then(()=>null);
  }

  adicionar(pessoa:Pessoa):Promise<Pessoa>{

    let headers = new HttpHeaders().append('Content-Type','application/json');

      /*
      return this.http.post(this.pessoasUrl,JSON.stringify(pessoa), {headers})
        .toPromise()
        .then();
      */
     return this.http.post<Pessoa>(this.pessoasUrl,pessoa, {headers})
        .toPromise()
        .then();
  }

  buscarPorCodigo(codigo:number):Promise<Pessoa>{
        return this.http.get(`${this.pessoasUrl}/${codigo}`)
          .toPromise()
          .then();
  }

  atualizar(pessoa:Pessoa):Promise<Pessoa>{
    
    let headers = new HttpHeaders().append('Content-Type','application/json');

      /*
      return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`,JSON.stringify(pessoa),{headers})
        .toPromise()
        .then();
      */
      return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`,pessoa,{headers})
        .toPromise()
        .then();
  }
  
  listarEstados():Promise<Estado[]>{
    return this.http.get(this.estadosUrl)
      .toPromise()
      .then();
  }

  pesquisarCidades(estado):Promise<Cidade[]>{
    let params = new HttpParams();
    params = params.set('estado',estado);
    return this.http.get(this.cidadesUrl, { params })
      .toPromise()
      .then(response => response as Cidade[]);

  }
}

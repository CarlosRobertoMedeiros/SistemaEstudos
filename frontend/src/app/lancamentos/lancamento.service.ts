import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = "http://localhost:9000/api/lancamentos";
  constructor(private http: HttpClient) {}

  pesquisar():Promise<any>{

    const headers = new HttpHeaders().append('Authorization','Basic YWRtaW46YWRtaW4=');
    
    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers })
      .toPromise()
      .then(response => response['content']);
  }
}

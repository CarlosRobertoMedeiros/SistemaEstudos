import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = "localhost:9000/lancamentos/";
  constructor(private http: HttpClient) {}

  pesquisar():Promise<any>{
    return this.http.get(`${this.lancamentosUrl}`)
    .toPromise()
    .then(response => response['content']);

  }
}

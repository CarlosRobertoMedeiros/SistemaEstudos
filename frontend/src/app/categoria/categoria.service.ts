import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriaUrl = "http://localhost:9000/api/categorias";
  constructor(private http: HttpClient) { }

  listarTodas():Promise<any>{
    let headers = new HttpHeaders().append('Authorization','Basic YWRtaW46YWRtaW4=');

    return this.http.get(this.categoriaUrl, {headers})
      .toPromise()
      .then()
  }
}

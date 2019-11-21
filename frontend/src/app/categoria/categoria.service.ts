import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriaUrl = "http://localhost:9000/api/categorias";
  constructor(private http: HttpClient) { }

  listarTodas():Promise<any>{

    return this.http.get(this.categoriaUrl)
      .toPromise()
      .then()
  }
}

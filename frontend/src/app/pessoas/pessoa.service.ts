import { Injectable } from '@angular/core';


export class PessoaFiltro{
  nome:string;
  pagina = 0;
  itensPorPagina =5;
}


@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor() { }

  pesquisar(this){
    console.log("Cheguei no Serviço "+this.nome);
  }



}

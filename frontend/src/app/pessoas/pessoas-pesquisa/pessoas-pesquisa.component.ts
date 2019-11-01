import { Component, OnInit } from '@angular/core';
import { PessoaService, PessoaFiltro } from '../pessoa.service';
import { LazyLoadEvent } from 'primeng/components/common/api';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {
  
  totalRegistros =0;
  filtro = new PessoaFiltro();
  pessoas = []
  
  constructor(private pessoaService:PessoaService){};

  pesquisar(pagina=0){
    this.filtro.pagina = pagina;
    //console.log(JSON.stringify(this.filtro)); //Verifico o que estou passando no json
    this.pessoaService.pesquisar(this.filtro)
      .then(resultado =>{
        this.totalRegistros = resultado.total;
        this.pessoas = resultado.pessoas;
      });
  }

  aoMudarPagina(event:LazyLoadEvent){
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

}

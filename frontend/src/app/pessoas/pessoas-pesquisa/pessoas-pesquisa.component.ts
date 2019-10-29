import { Component, OnInit } from '@angular/core';
import { PessoaService, PessoaFiltro } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {
  
  filtro = new PessoaFiltro();
  
  pessoas = [
      { nome: 'Manoel Pinheiro', cidade: 'Uberlândia', estado: 'MG', ativo: true },
      { nome: 'Sebastião da Silva', cidade: 'São Paulo', estado: 'SP', ativo: false },
      { nome: 'Carla Souza', cidade: 'Florianópolis', estado: 'SC', ativo: true },
      { nome: 'Luís Pereira', cidade: 'Curitiba', estado: 'PR', ativo: true },
      { nome: 'Vilmar Andrade', cidade: 'Rio de Janeiro', estado: 'RJ', ativo: false },
      { nome: 'Paula Maria', cidade: 'Uberlândia', estado: 'MG', ativo: true }
  ]
  
  constructor(private pessoaService:PessoaService){};

  pesquisar(pagina=0){
    console.log("Cheguei no TS"+this.filtro);
    //this.pessoaService.pesquisar();
  }



}

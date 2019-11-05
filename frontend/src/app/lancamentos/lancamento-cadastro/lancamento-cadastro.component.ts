import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { CategoriaService } from 'src/app/categoria/categoria.service';


@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    {label:'Receita',value:'RECEITA'},
    {label:'Despesa',value:'DESPESA'},
  ];

  categorias = [];

  pessoas = [
    {label:'João da Silva',value:'1'},
    {label:'Sebastião Souza',value:'2'},
    {label:'Maria Abadia',value:'3'}
  ];


  constructor(private categoriaService:CategoriaService,
              private errorHandler:ErrorHandlerService) { }

  ngOnInit() {
    this.carregarCategorias();
  }

  carregarCategorias(){
    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c =>({ label:c.nome, value: c.codigo}))
      })
      .catch(erro => this.errorHandler.handle(erro));
      

  }

}

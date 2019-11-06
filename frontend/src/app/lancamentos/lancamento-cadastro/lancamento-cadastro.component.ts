import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { CategoriaService } from 'src/app/categoria/categoria.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { Lancamento } from 'src/app/core/model';
import { FormControl } from '@angular/forms';


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
  pessoas = [];
  lancamento = new Lancamento();


  constructor(private categoriaService:CategoriaService,
              private pessoaService:PessoaService,
              private errorHandler:ErrorHandlerService) { }

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  salvar(form:FormControl){
    console.log(this.lancamento);
  }

  carregarCategorias(){
    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c =>({ label:c.nome, value: c.codigo}))
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas(){
    return this.pessoaService.listarTodas()
      .then(pessoas =>{
        this.pessoas = pessoas.map(p =>({label:p.nome , value: p.codigo}))
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


}

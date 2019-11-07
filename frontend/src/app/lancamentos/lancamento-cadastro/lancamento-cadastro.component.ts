import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { CategoriaService } from 'src/app/categoria/categoria.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { LancamentoService } from '../lancamento.service';

import { Lancamento } from 'src/app/core/model';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';


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
              private lancamentoService:LancamentoService,
              private toasty:ToastrService,
              private errorHandler:ErrorHandlerService) { }

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  salvar(form:FormControl){
    return this.lancamentoService.adicionar(this.lancamento)
      .then(()=>{
          form.reset();
          this.toasty.success('Lançamento Adicionado com Sucesso !');
          this.lancamento = new Lancamento();
      })
      .catch(erro => this.errorHandler.handle(erro));
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

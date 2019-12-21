import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from '../pessoa.service';
import { Pessoa, Contato } from 'src/app/core/model';



@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  estados:any[];
  cidades:any[];
  estadoSelecionado:number;
  
  constructor(
    private pessoaService:PessoaService,
    private toasty:ToastrService,
    private errorHandler:ErrorHandlerService,
    private route:ActivatedRoute,
    private router:Router,
    private title:Title) { }
  
  ngOnInit(){
    this.title.setTitle('Nova Pessoa');

    const codigoPessoa = this.route.snapshot.params['codigo'];

    this.carregarEstados();

    if (codigoPessoa){
      this.carregarPessoa(codigoPessoa);//Para Edição
    }

  }
  
  carregarEstados(){
    this.pessoaService.listarEstados()
      .then(lista => {
        this.estados = lista.map(uf=>({label: uf.nome, value: uf.codigo}));
      })
      .catch(erro =>{this.errorHandler.handle(erro)});
  }

  carregarCidades(){
    this.pessoaService.pesquisarCidades(this.estadoSelecionado)
      .then(lista => {
        this.cidades = lista.map(c=>({label: c.nome, value: c.codigo}));
      })
      .catch(erro =>{this.errorHandler.handle(erro)});
  }

  get editando(){
    return Boolean(this.pessoa.codigo); //Existindo Código está editando
  }
 
  atualizarPessoa(form:FormControl){
    this.pessoaService.atualizar(this.pessoa)
      .then(pessoa =>{
        this.pessoa = pessoa;
        this.atualizarTituloEdicao();
        this.toasty.success('Pessoa Alterado com Sucesso !');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  adicionarPessoa(form:FormControl){
    return this.pessoaService.adicionar(this.pessoa)
    .then(pessoaAdicionada=>{
        form.reset();
        this.toasty.success('Pessoa Adicionada com Sucesso !');
        this.router.navigate(['/pessoas',pessoaAdicionada.codigo]);
        this.pessoa = new Pessoa();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form:FormControl){
    if (this.editando){
      this.atualizarPessoa(form)
    }else{
      this.adicionarPessoa(form)
    }
  }


  
  carregarPessoa(codigo:number){
      return this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa => {
          this.pessoa = pessoa; 
          this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));

  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de lancamento: ${this.pessoa.nome}`);
  }

  novo(form:FormControl){
    form.reset();

    //Esse setTimeout é apenas um WorkArround = Gambiarra
    //Devido a limitações do form.reset() do angular
    //Pois perdeu a referência. o form.reset() perdeu tudo
    setTimeout(function(){
      this.pessoa = new Pessoa();
    }.bind(this),1);
    this.router.navigate(['/pessoas/novo']); 

  }

}

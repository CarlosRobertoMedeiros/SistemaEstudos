import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ToastrService, ToastrComponentlessModule } from 'ngx-toastr';

import { CategoriaService } from 'src/app/categoria/categoria.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { LancamentoService } from '../lancamento.service';

import { Lancamento } from 'src/app/core/model';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ActivatedRoute } from '@angular/router';


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
              private errorHandler:ErrorHandlerService,
              private route:ActivatedRoute) { }

  ngOnInit() {
    const codigoLancamento = this.route.snapshot.params['codigo'];
    if (codigoLancamento){
      this.carregarLancamento(codigoLancamento);//Para Edição
    }
    
    this.carregarCategorias();
    this.carregarPessoas();
  }

  get editando(){
    return Boolean(this.lancamento.codigo); //Existindo Código está editando
  }

  carregarLancamento(codigo:number){
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento =>{
        this.lancamento = lancamento;
      })
      .catch(erro => this.errorHandler.handle(erro));

  }

  salvar(form:FormControl){
    if (this.editando){
      this.atualizarLancamento(form)
    }else{
      this.adicionarLancamento(form)
    }
  }

  atualizarLancamento(form:FormControl){
    this.lancamentoService.atualizar(this.lancamento)
      .then(lancamento =>{
        this.lancamento = lancamento;

        this.toasty.success('Lançamento Alterado com Sucesso !');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  adicionarLancamento(form:FormControl){
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

  onSelectMethod(event){
    console.log(event);
    /*let formattedDate = $filter('date')event, 'dd/MM/yyyy');
    let d = new Date(Date.parse(event));
    console.log("d"+d);
    console.log(`${d.getDay()}/${d.getMonth()}/${d.getFullYear()}`);*/

  }

}

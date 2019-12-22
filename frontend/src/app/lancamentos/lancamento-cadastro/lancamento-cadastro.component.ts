import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';

import { CategoriaService } from 'src/app/categoria/categoria.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { LancamentoService } from '../lancamento.service';

import { Lancamento } from 'src/app/core/model';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


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
  //lancamento = new Lancamento();
  
  formulario:FormGroup;


  constructor(private categoriaService:CategoriaService,
              private pessoaService:PessoaService,
              private lancamentoService:LancamentoService,
              private messageService:MessageService,
              private errorHandler:ErrorHandlerService,
              private route:ActivatedRoute,
              private router:Router,
              private title:Title,
              private formBuilder:FormBuilder) { 

              }

  ngOnInit() {
    
    this.configurarFormulario();
    this.title.setTitle('Novo lançamento');
    
    const codigoLancamento = this.route.snapshot.params['codigo'];
    if (codigoLancamento){
      this.carregarLancamento(codigoLancamento);//Para Edição
    }
    
    this.carregarCategorias();
    this.carregarPessoas();
  }

  configurarFormulario(){
    this.formulario = this.formBuilder.group({
      codigo:[],
      tipo:['RECEITA',Validators.required],
      dataVencimento:[null,Validators.required],
      dataPagamento:[],
      descricao:[null,[this.validarObrigatoriedade, this.validarTamanhoMinimo(5) ]],
      valor:[null,Validators.required],
      pessoa: this.formBuilder.group({
        codigo:[null,Validators.required],
        nome:[]
      }),
      categoria: this.formBuilder.group({
        codigo:[null, Validators.required], 
        nome:[] 
      }),
      observacao:[],
    });
  }

  validarObrigatoriedade(input:FormControl){
    return (input.value ? null : { obrigatoriedade:true });
  }
  validarTamanhoMinimo(valor:number){
    return (input:FormControl)=>{
      return (!input.value ||input.value.length >=valor ? null : {tamanhoMinimo: { tamanho: valor }} );
    }
  }

  get editando(){
    return Boolean(this.formulario.get('codigo').value); //Existindo Código está editando
  }

  carregarLancamento(codigo:number){
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento =>{
        //this.lancamento = lancamento;
        this.formulario.patchValue(lancamento);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));

  }

  salvar(){
    if (this.editando){
      this.atualizarLancamento()
    }else{
      this.adicionarLancamento()
    }
  }

  atualizarLancamento(){
    this.lancamentoService.atualizar(this.formulario.value)
      .then(lancamento =>{
        //this.lancamento = lancamento;
        this.formulario.patchValue(lancamento);
        this.atualizarTituloEdicao();
        this.messageService.add({severity:'success', detail: 'Lançamento Alterado com Sucesso !'});  
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  adicionarLancamento(){
    return this.lancamentoService.adicionar(this.formulario.value)
      .then((lancamentoAdicionado)=>{
          this.messageService.add({severity:'success', detail: 'Lançamento Adicionado com Sucesso !'});  
          this.router.navigate(['/lancamentos',lancamentoAdicionado.codigo]);
          //console.log("url =>"+this.lancamentoService.lancamentosUrl+"lancAdicionado"+lancamentoAdicionado.codigo);
          //his.router.navigate([this.lancamentoService.lancamentosUrl,lancamentoAdicionado.codigo]);
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

  novo(){
    this.formulario.reset();

    //Esse setTimeout é apenas um WorkArround = Gambiarra
    //Devido a limitações do form.reset() do angular
    //Pois perdeu a referência. o form.reset() perdeu tudo
    setTimeout(function(){
      this.lancamento = new Lancamento();
    }.bind(this),1);
    this.router.navigate(['/lancamentos/novo']);  

  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de lancamento: ${this.formulario.get('descricao').value}`);

  }

}

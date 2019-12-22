import { Component, ViewChild, OnInit } from '@angular/core';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';

import { PessoaService, PessoaFiltro } from '../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {
  
  totalRegistros =0;
  filtro = new PessoaFiltro();
  pessoas = [];
  @ViewChild('tabela', {static: true}) grid;
  
  constructor(private pessoaService:PessoaService,
              private errorHandler:ErrorHandlerService,
              private messageService:MessageService,
              private confirmation:ConfirmationService,
              private title:Title){};

  ngOnInit(){
    this.title.setTitle('Pesquisa de Pessoas');
  }
   
              
  pesquisar(pagina=0){
    this.filtro.pagina = pagina;
    
    this.pessoaService.pesquisar(this.filtro)
      .then(resultado =>{
        this.totalRegistros = resultado.total;
        this.pessoas = resultado.pessoas;
      }).
      catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event:LazyLoadEvent){
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa:any){
    this.confirmation.confirm({
      message:'Tem certeza que deseja excluir a Pessoa ?',
      accept:()=>{
        this.excluir(pessoa);
      }
    })
  }
  
  
  excluir(pessoa:any){
    //console.log(JSON.stringify(codigo));
    this.pessoaService.excluir(pessoa.codigo)
      .then(()=>{
        this.grid.reset();
        this.messageService.add({severity:'success', detail: 'Pessoa Excluida com Sucesso !!'});
      })
      .catch(erro => this.errorHandler.handle(erro));

  }

  mudarStatus(pessoa:any){
    //console.log(JSON.stringify(pessoa));
    let novoStatus = !pessoa.ativo;

    this.pessoaService.mudarStatus(pessoa.codigo,novoStatus)
      .then(()=>{
        pessoa.ativo = novoStatus;
        this.messageService.add({ severity:'success',detail:'`O Status de ${pessoa.nome} foi alterado para ${novoStatus===false?"Inativo":"Ativo"}`'});
      })
      .catch(erro => this.errorHandler.handle(erro));

  }

}

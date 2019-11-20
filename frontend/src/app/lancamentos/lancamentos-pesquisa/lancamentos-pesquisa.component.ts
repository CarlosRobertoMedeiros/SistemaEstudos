import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';

import { stringify } from '@angular/compiler/src/util';
import { ToastrService } from 'ngx-toastr';

import { LancamentoService, LancamentoFiltro } from '../lancamento.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {
  
  totalRegistros =0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  @ViewChild('tabela', {static: true}) grid;

  constructor(private lancamentoService:LancamentoService,
              private errorHandler:ErrorHandlerService,
              private toasty:ToastrService,
              private confirmation:ConfirmationService,
              private title:Title){}

  ngOnInit(){
    this.title.setTitle('Pesquisa de Lançamentos');
    
  }

  pesquisar(pagina=0){
    this.filtro.pagina = pagina; 

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado =>{
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado.lancamentos;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event:LazyLoadEvent){
    const pagina = event.first / event.rows; 
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento:any){
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir o Lançamento ?',
      accept: ()=>{
        this.excluir(lancamento);
      } 
    });
  }

  excluir(lancamento:any){
    //console.log(JSON.stringify(lancamento));
    this.lancamentoService.excluir(lancamento.codigo)
      .then(()=>{
        this.grid.reset();
        this.toasty.success('Lançamento Excluido com Sucesso !!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


}

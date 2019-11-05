import { Component, ViewChild } from '@angular/core';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';

import { PessoaService, PessoaFiltro } from '../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {
  
  totalRegistros =0;
  filtro = new PessoaFiltro();
  pessoas = [];
  @ViewChild('tabela', {static: true}) grid;
  
  constructor(private pessoaService:PessoaService,
              private errorHandler:ErrorHandlerService,
              private toasty:ToastrService,
              private confirmation:ConfirmationService){};

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
        this.toasty.success("Pessoa Excluida com Sucesso !!");
      })
      .catch(erro => this.errorHandler.handle(erro));

  }

  mudarStatus(pessoa:any){
    //console.log(JSON.stringify(pessoa));
    let novoStatus = !pessoa.ativo;

    this.pessoaService.mudarStatus(pessoa.codigo,novoStatus)
      .then(()=>{
        pessoa.ativo = novoStatus;
        this.toasty.success(`O Status de ${pessoa.nome} foi alterado para ${novoStatus===false?"Inativo":"Ativo"}`);
      })
      .catch(erro => this.errorHandler.handle(erro));

  }

}

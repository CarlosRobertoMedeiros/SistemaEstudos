import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { Pessoa } from 'src/app/core/model';
import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';


@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private pessoaService:PessoaService,
    private toasty:ToastrService,
    private errorHandler:ErrorHandlerService) { }
  
  ngOnInit(){

  }

  salvar(form:FormControl){
    return this.pessoaService.adicionar(this.pessoa)
    .then(()=>{
        form.reset();
        this.toasty.success('Pessoa Adicionada com Sucesso !');
        this.pessoa = new Pessoa();
    })
    .catch(erro => this.errorHandler.handle(erro));
    
  }
}

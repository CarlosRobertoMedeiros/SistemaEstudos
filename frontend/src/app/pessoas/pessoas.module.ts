import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/components/table/table';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { ButtonModule } from 'primeng/components/button/button';

import { InputMaskModule } from 'primeng/components/inputmask/inputmask';

import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';

@NgModule({
  declarations: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    
    InputMaskModule,
    TableModule,
    TooltipModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule
  ],

  exports:[
    PessoaCadastroComponent,
    PessoasPesquisaComponent
  ]
})
export class PessoasModule { }

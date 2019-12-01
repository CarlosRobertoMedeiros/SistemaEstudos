import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { TableModule } from 'primeng/components/table/table';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';

import { CurrencyMaskModule } from 'ng2-currency-mask';

import { SharedModule } from '../shared/shared.module';

import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentosRoutingModule } from './lancamentos-routing.module';



@NgModule({
  declarations: [
    LancamentoCadastroComponent,
    LancamentosPesquisaComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
    InputTextModule,
    InputTextareaModule,
    SelectButtonModule,
    CalendarModule,
    DropdownModule,
    TableModule,
    TooltipModule,
    CurrencyMaskModule,
    
    SharedModule,
    LancamentosRoutingModule
  ],

  exports:[]
})
export class LancamentosModule { }

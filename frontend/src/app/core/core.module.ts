//Dados do Locale
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice'
import { CommonModule } from '@angular/common';

import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { GrowlModule } from 'primeng/components/growl/growl';
import { AuthService } from '../seguranca/auth.service';

import { DashboardService } from './../dashboard/dashboard.service';
import { RelatoriosService } from '../relatorios/relatorios.service';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { PessoaService } from '../pessoas/pessoa.service';
import { RouterModule } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { Title } from '@angular/platform-browser';
import { PaginaNaoAutorizadaComponent } from './pagina-nao-autorizada/pagina-nao-autorizada.component';


registerLocaleData(localePt);


@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    PaginaNaoAutorizadaComponent
  ],

  imports: [
    CommonModule,
    RouterModule,
    
    GrowlModule,
    ConfirmDialogModule
  ],

  exports : [
    NavbarComponent,
    GrowlModule,
    ConfirmDialogModule
  ],

  providers:[
    LancamentoService,
    PessoaService,
    ErrorHandlerService,
    AuthService,
    DashboardService,
    RelatoriosService,
    ConfirmationService,
    MessageService,
    Title,
    { provide: LOCALE_ID, useValue: 'pt' }
  ]

})
export class CoreModule { }

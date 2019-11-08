//Dados do Locale
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { ConfirmationService } from 'primeng/components/common/api';
registerLocaleData(localePt);


import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastrModule } from 'ngx-toastr';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { PessoaService } from '../pessoas/pessoa.service';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavbarComponent
  ],

  imports: [
    CommonModule,
    RouterModule,
    
    ToastrModule.forRoot(), // ToastrModule added
    ConfirmDialogModule,

  ],

  exports : [
    NavbarComponent,
    ConfirmDialogModule
  ],

  providers:[
    LancamentoService,
    PessoaService,
    ErrorHandlerService,
    
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt' },
  ]

})
export class CoreModule { }

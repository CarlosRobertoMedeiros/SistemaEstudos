import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../seguranca/auth.guard';

import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';


const routes: Routes = [
    {
      path:'lancamentos',
      component:LancamentosPesquisaComponent, 
      canActivate:[AuthGuard]
    },
    
    {
      path:'lancamentos/novo',
      component:LancamentoCadastroComponent,
      canActivate:[AuthGuard]
    },
    
    {
      path:'lancamentos/:codigo',
      component:LancamentoCadastroComponent,
      canActivate:[AuthGuard]
    },
  ];

@NgModule({
  imports: [
   RouterModule.forChild(routes)
  ],

  exports:[RouterModule]
})
export class LancamentosRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { PaginaNaoAutorizadaComponent } from './core/pagina-nao-autorizada/pagina-nao-autorizada.component';
import { LoginFormComponent } from './seguranca/login-form/login-form.component';


const routes: Routes = [
  {path:'lancamentos', loadChildren:'./lancamentos/lancamentos.module#LancamentosModule'},
  {path:'pessoas', loadChildren:'./pessoas/pessoas.module#PessoasModule'},
  {path:'dashboard', loadChildren:'./dashboard/dashboard.module#DashboardModule'},
  {path:'relatorios', loadChildren:'./relatorios/relatorios.module#RelatoriosModule'},

  {path:'',redirectTo:'dashboard', pathMatch:'full'},
  {path:'app-pagina-nao-autorizada',component:PaginaNaoAutorizadaComponent},
  {path:'pagina-nao-encontrada',component:PaginaNaoEncontradaComponent},
  {path:'**',redirectTo:'pagina-nao-encontrada'}//Tem que ficar por ultimo pois caso não acesse nada redireciona aqui
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

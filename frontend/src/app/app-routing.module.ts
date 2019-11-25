import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { PaginaNaoAutorizadaComponent } from './core/pagina-nao-autorizada/pagina-nao-autorizada.component';


const routes: Routes = [
  {path:'',redirectTo:'lancamentos', pathMatch:'full'},
  {path:'app-pagina-nao-autorizada',component:PaginaNaoAutorizadaComponent},
  {path:'pagina-nao-encontrada',component:PaginaNaoEncontradaComponent},
  {path:'**',redirectTo:'pagina-nao-encontrada'}//Tem que ficar por ultimo pois caso não acesse nada redireciona aqui
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

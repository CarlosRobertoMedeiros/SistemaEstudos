import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';


const routes: Routes = [
  {path:'',redirectTo:'lancamentos', pathMatch:'full'},
  {path:'pessoas',component:PessoasPesquisaComponent},
  {path:'pessoas/novo',component:PessoaCadastroComponent},
  {path:'pagina-nao-encontrada',component:PaginaNaoEncontradaComponent},
  {path:'**',redirectTo:'pagina-nao-encontrada'}//Tem que ficar por ultimo pois caso não acesse nada redireciona aqui
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule }     from './app-routing.module';
import { AppComponent }         from './app.component';
import { Routes, RouterModule } from '@angular/router';


// Os próximos 2 Imports deveriam estar em outro Projeto
// Como é um aprendizado nas técnicas, decidi não alterar
import { ExemploFormComponent } from './exemplo-form/exemplo-form.component';
import { DicasInterpolacaoComponent } from './dicas-interpolacao/dicas-interpolacao.component';

import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';

import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';


const routes: Routes = [
    {path:'lancamentos',component:LancamentosPesquisaComponent},
    {path:'lancamentos/novo',component:LancamentoCadastroComponent},
    {path:'pessoas',component:PessoasPesquisaComponent},
    {path:'pessoas/novo',component:PessoaCadastroComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    ExemploFormComponent,
    DicasInterpolacaoComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),

    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    CoreModule,
    LancamentosModule,
    PessoasModule
],
  providers: [
  

  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule }     from './app-routing.module';
import { AppComponent }         from './app.component';

// Os próximos 2 Imports deveriam estar em outro Projeto
// Como é um aprendizado nas técnicas, decidi não alterar
import { ExemploFormComponent } from './exemplo-form/exemplo-form.component';
import { DicasInterpolacaoComponent } from './dicas-interpolacao/dicas-interpolacao.component';

import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';

import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentoService } from './lancamentos/lancamento.service';






@NgModule({
  declarations: [
    AppComponent,
    ExemploFormComponent,
    DicasInterpolacaoComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,

    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    CoreModule,

    LancamentosModule,
    PessoasModule
    
    
],
  providers: [LancamentoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

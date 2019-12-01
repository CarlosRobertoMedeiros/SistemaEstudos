import { NgModule} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent }         from './app.component';
import { AppRoutingModule }     from './app-routing.module';

// Os próximos 2 Imports deveriam estar em outro Projeto
// Como é um aprendizado nas técnicas, decidi não alterar
import { ExemploFormComponent } from './exemplo-form/exemplo-form.component';
import { DicasInterpolacaoComponent } from './dicas-interpolacao/dicas-interpolacao.component';

import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';

import { SegurancaModule } from './seguranca/seguranca.module';

@NgModule({
  declarations: [
    AppComponent,
    ExemploFormComponent,
    DicasInterpolacaoComponent
  ],
  imports: [
    HttpClientModule,

    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    CoreModule,
    SegurancaModule,
    AppRoutingModule //Vai ter que usar depois de lancamento Módulo, rota sempre depois do módulo

],
  
  bootstrap: [AppComponent]
})
export class AppModule { }

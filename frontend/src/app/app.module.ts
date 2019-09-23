//Componente Padrão do Angular
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Componente ng2-mask
import { CurrencyMaskModule } from 'ng2-currency-mask';


import { AppRoutingModule }     from './app-routing.module';
import { AppComponent }         from './app.component';

//Componentes PrimeNg
import { InputTextModule }      from 'primeng/components/inputtext/inputtext';
import { InputTextareaModule }  from 'primeng/components/inputtextarea/inputtextarea';
import { SelectButtonModule }   from 'primeng/components/selectbutton/selectbutton';
import { DropdownModule }       from 'primeng/components/dropdown/dropdown';
import { ButtonModule }         from 'primeng/components/button/button';
import { TableModule }          from 'primeng/components/table/table';
import { TooltipModule }        from 'primeng/components/tooltip/tooltip';
import { CalendarModule }       from 'primeng/components/calendar/calendar';
import { InputMaskModule }      from 'primeng/components/inputmask/inputmask';

//Meus Componentes
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { ExemploFormComponent } from './exemplo-form/exemplo-form.component';
import { FormsModule } from '@angular/forms';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { MessageComponent } from './message/message.component';



@NgModule({
  declarations: [
    AppComponent,
    LancamentosPesquisaComponent,
    NavbarComponent,
    PessoasPesquisaComponent,
    ExemploFormComponent,
    LancamentoCadastroComponent,
    PessoaCadastroComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    FormsModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    InputMaskModule,
    CurrencyMaskModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';

import { HttpClientModule } from '@angular/common/http';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { FormsModule } from '@angular/forms';

export function tokenGetter(): string {
  console.log("Token =>"+localStorage.getItem("token"))
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [LoginFormComponent],
  
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:9000'],
        blacklistedRoutes: ['http://localhost:9000/oauth/token']
      }
  })

],

  providers:[
    JwtHelperService
  ]

})
export class SegurancaModule { }

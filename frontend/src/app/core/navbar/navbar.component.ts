import { Component, OnInit, ErrorHandler } from '@angular/core';
import { AuthService } from 'src/app/seguranca/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  exibindoMenu = false;
  

  constructor (public auth:AuthService,
               private errorHandler:ErrorHandler,
               private router:Router ){
    
  }

  criarNovoAccessToken(){
    this.auth.obterNovoAccessToken();
  }

  logout(){
    this.auth.logout()
      .then(()=>{
        this.router.navigate(['/login']);
      })
      .catch(erro =>this.errorHandler.handleError(erro));
  }

  

}

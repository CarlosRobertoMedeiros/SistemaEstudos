import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private auth:AuthService,
              private router:Router){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
      //Esse if serve apenas no caso de não existir nenhum cookie de token
      //redirecionando o usuário para a pagina de login
      //Lembre-se que podemos limpar os cookies
      if (this.auth.isAccessTokenValido()) {
      console.log("Navegação com AccessTokenInvalido ... Obtendo novo AccessToken");
      return this.auth.obterNovoAccessToken()
        .then(() =>{
          if (!this.auth.isAccessTokenValido()){
            this.router.navigate(['/login']);
            return false;
          }
          return true;
        });
    }


    //Aqui sim é o controle de guarda da navegação
    else if (next.data.roles && 
          !this.auth.temQualquerPermissao(next.data.roles)){
           this.router.navigate(['/app-pagina-nao-autorizada']) ;
            return false;
          }
    
      return true;
  }
  
}

import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';
import { stringify } from 'querystring';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl : string;
  tokensRevokeUrl : string;

  jwtPayLoad: any;

  constructor(private http: HttpClient,
              private jwtHelperService:JwtHelperService ) { 
                
                this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
                this.tokensRevokeUrl = `${environment.apiUrl}/tokens/revoke`;
                
                this.carregarToken();
              }
  
    //O logout apenas limpa o refreshToken
    //E dando tudo certo, ele chama o limparAcessToken
    logout(){
      return this.http.delete(this.tokensRevokeUrl, {withCredentials:true})
        .toPromise()
        .then(()=>{
          this.limparAcessToken();
        })
    }              
  
    
    login(usuario:string, senha:string):Promise<void>{
    
    
    const headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded',
                                    'Authorization': 'Basic '+btoa("angular:angular")});

    


    //TODO: Implementar mudança para saber se o sistema veio de um pc ou um cel
    console.log("Senha em Base 64 =>"+btoa("angular:angular"))

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    console.log(body);
   
    return this.http.post(this.oauthTokenUrl, body, {headers, withCredentials:true})
      .toPromise()
      .then(response =>{
        this.armazenarToken(response['access_token']);
      })
      .catch(response => {
        const responseError = response.error;
        if(response.status === 400){
          if (responseError.error === 'invalid_grant'){
            return Promise.reject('Usuário ou senha inválido');
          }
        }
        return Promise.reject(response);
      });
  }

  obterNovoAccessToken():Promise<void>{
      
    let body = 'grant_type=refresh_token';
    //Olhar esse Link https://www.youtube.com/watch?v=CPbvxxslDTU
    //O post já vai incluir o cookie automaticamente no refresh_token
    //Na ida o navegador ja colocou
    //Existe problema de CrossSite (Cors) //Quando uma requisição cross site deve receber credenciais
    
    
    let headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded',
                                    'Authorization': 'Basic '+btoa("angular:angular")});

    return this.http.post(this.oauthTokenUrl, body, {headers, withCredentials:true})
        .toPromise()
        .then(response =>{
          this.armazenarToken(response['access_token']);
          return Promise.resolve(null);
        })
        .catch(erro=>{
          console.log("Erro ao renovar o token.",erro);
          //Se não renovar o token não tem o que fazer
          //por isso não usei reject
          return Promise.resolve(null);
        })
  }
  
  
  temPermissao(permissao:string){
    //Método que testa o payLoad para retornar as permissões do usuário
    return this.jwtPayLoad 
            && this.jwtPayLoad.authorities.includes(permissao);

  }

  limparAcessToken(){
    localStorage.removeItem('token');
    this.jwtPayLoad=null;
  }

  isAccessTokenValido(){
    let token = localStorage.getItem('token');
    return !token || this.jwtHelperService.isTokenExpired(token);
  }

  temQualquerPermissao(roles){
    for (let role of roles){
      if (this.temPermissao(role)) {
        return true;
      } 
    }
    return false;
  }
  
  
  
  private armazenarToken(token:string){
    this.jwtPayLoad = this.jwtHelperService.decodeToken(token);
    localStorage.setItem('token',token); //Armazena no browser do usuário
  }

  private carregarToken(){
    const token = localStorage.getItem('token');

    if (token){
      this.armazenarToken(token);
    }
  }




}
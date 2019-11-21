import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl ='http://localhost:9000/oauth/token';
  jwtPayLoad: any;

  constructor(private http: HttpClient,
              private jwtHelperService:JwtHelperService ) { 
                this.carregarToken();
              }

  login(usuario:string, senha:string):Promise<void>{
    
    
    const headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                                    'Authorization': 'Basic '+btoa("angular:angular")});
    //TODO: Implementar mudança para saber se o sistema veio de um pc ou um cel

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    console.log(body);
   
    return this.http.post(this.oauthTokenUrl, body, {headers})
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
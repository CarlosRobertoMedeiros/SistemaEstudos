import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl ='http://localhost:8080/oauth/token';
  constructor(private http: HttpClient) { }

  login(usuario:string, senha:string):Promise<void>{
    
    let headers = new HttpHeaders();
    let contentType:string = 'application/x-www-form-urlencoded';//Olhar Parâmetros no PostMan
    let encodeOuauthBase64:string = 'Basic YW5ndWxhcjpAbmd1bEByMA=='; //TODO Mudar no backEnd
    
    headers.append('Content-Type',contentType);
    headers.append('Authorization',encodeOuauthBase64);

    let body = `username=${usuario}
                &password=${senha}
                &grant_type=password`;
    
    return this.http.post(this.oauthTokenUrl, body, {headers})
      .toPromise()
      .then(response =>{
        console.log(response);
      })
      .catch(response => {console.log(response)});
  }
}

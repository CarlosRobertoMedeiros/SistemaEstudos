import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl ='http://localhost:9000/oauth/token';

  constructor(private http: HttpClient) { }

  login(usuario:string, senha:string):Promise<void>{
    
    const headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                                    'Authorization': 'Basic '+btoa("angular:angular")});


    const body = `username=${usuario}&password=${senha}&grant_type=password`;
   
    return this.http.post(this.oauthTokenUrl, body, {headers})
      .toPromise()
      .then(response =>{
        console.log(response);
      })
      .catch(response => {console.log(response)});
  }
}
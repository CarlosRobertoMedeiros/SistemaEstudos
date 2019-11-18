import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private authService:AuthService,
              private erroHandler:ErrorHandlerService,
              private router:Router) { }
              

  ngOnInit() {
  }

  login(usuario:string , senha:string){
    this.authService.login(usuario,senha)
      .then(()=>{
        this.router.navigate(['/lancamentos']);
      })
      .catch(erro =>{
        this.erroHandler.handle(erro);
      });
  }

}

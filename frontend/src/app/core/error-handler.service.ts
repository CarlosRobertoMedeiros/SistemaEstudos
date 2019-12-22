import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { JsonPipe } from '@angular/common';

import { Router } from '@angular/router';

import { NotAutenticatedError } from '../seguranca/money-http-interceptor';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService:MessageService, 
              private router:Router) { }
  
  handle(errorResponse:any){
    let msg:string;
   
    if (typeof errorResponse==='string'){
      msg = errorResponse;
    }
    //Esse else if é uma técnica legal de retornar o Erro de Autenticação
    //Serve para trabalhar com o refreshToken
    else if (errorResponse instanceof NotAutenticatedError){
      msg = "Sua sessão expirou !!!";
      this.router.navigate(['/login']);
    }
    
    else if (errorResponse.status >= 400 && errorResponse.status <= 499) {
        let errors;
        msg = 'Ocorreu um erro ao processar a sua solicitação';

        if (errorResponse.status === 403){
          msg = 'Você não tem permissão para executar esta ação';
        }

        try {
          console.log("cheguei na comparação 400"+errorResponse.status);    
          msg = errorResponse.error[0].mensagemUsuario;
        } catch (e) { }

        console.error('Ocorreu um erro', errorResponse);

    }else{
      msg = "Erro ao processar serviço remoto. Tente novamente."
      console.log('Ocorreu um Erro ',errorResponse);  
    }
    this.messageService.add({severity:'error', detail : msg});
  }
}
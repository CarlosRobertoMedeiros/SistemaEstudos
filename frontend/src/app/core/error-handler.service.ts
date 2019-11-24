import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toasty:ToastrService) { }
  
  handle(errorResponse:any){
    let msg:string;
   
    if (typeof errorResponse==='string'){
      msg = errorResponse;
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
    this.toasty.error(msg);
  }
}
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toasty:ToastrService) { }
  
  handle(errorResponse:any){
    let msg:string;
    
    if (typeof errorResponse==='string'){
      msg = errorResponse;
    }else{
      console.log('Ocorreu um Erro ',errorResponse);  
    }
    this.toasty.error(msg);
  }
}
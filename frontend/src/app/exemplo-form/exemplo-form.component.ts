import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

class Cliente{
  nome:string;
  email:string;
  profissao:string;
}


@Component({
  selector: 'app-exemplo-form',
  templateUrl: './exemplo-form.component.html',
  styleUrls: ['./exemplo-form.component.css']
})
export class ExemploFormComponent  {

  cliente = new Cliente();

  profissao = 'Outra';
  profissoes = [
      'Programador',
      'Empresário',
      'Outra'
  ];
    
  salvar(form:NgForm){
    //this.cliente.nome = form.value.nome;
    //this.cliente.email = form.value.email;
    //this.cliente.profissao = form.value.profissao;
    
    console.log(form);
    form.reset({profissao:''});
    //console.log(this.cliente);

  }
}

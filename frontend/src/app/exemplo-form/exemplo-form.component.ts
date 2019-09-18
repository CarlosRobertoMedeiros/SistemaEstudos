import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-exemplo-form',
  templateUrl: './exemplo-form.component.html',
  styleUrls: ['./exemplo-form.component.css']
})
export class ExemploFormComponent  {

  salvar(form:NgForm){
    console.log("Salvando");
    console.log(form);
  }
}

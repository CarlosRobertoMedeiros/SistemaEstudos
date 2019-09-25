import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dicas-interpolacao',
  templateUrl: './dicas-interpolacao.component.html',
  styleUrls: ['./dicas-interpolacao.component.css']
})
export class DicasInterpolacaoComponent {
    nome='Carlos Roberto';
    idade=37;

    adicionar(){
      //console.log(`Adicionando ${this.nome}`);
      console.log('Adicionando'+ this.nome); //Qualquer Jeito da Certo 

      const numero = Math.round(Math.random()*100); 
      this.nome = 'João ' + numero;
    }

    alterarNome(event:any){
        //console.log(event);
        this.nome = event.target.value;
    }

    adicionar2(nome:string){
      //console.log(nome); 
      this.nome = nome;
    }
}

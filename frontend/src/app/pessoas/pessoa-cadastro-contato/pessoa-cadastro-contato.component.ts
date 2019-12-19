import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Contato } from 'src/app/core/model';

@Component({
  selector: 'app-pessoa-cadastro-contato',
  templateUrl: './pessoa-cadastro-contato.component.html',
  styleUrls: ['./pessoa-cadastro-contato.component.css']
})
export class PessoaCadastroContatoComponent implements OnInit {

  @Input() contatos:Array<Contato>;
  exibindoFormularioContato = false;
  contato:Contato;
  contatoIndex;

  constructor() { }

  ngOnInit() {
  }

  prepararNovoContato(){
    this.exibindoFormularioContato=true;
    this.contato = new Contato();
    this.contatoIndex = this.contatos.length;//Guardando o Index para "corrigir" o two way data bind
  }

  prepararEdicaoContato(contato:Contato, index:Number){
    //Se não "clonar" ele vai forçar o bind e vai atualizar
    this.contato = this.clonarContato(contato);
    this.exibindoFormularioContato=true;
    this.contatoIndex = index;//Para Edição Após resolver o bind
  }

  confirmarContato(frm:FormControl){
    //Clonei o contato apenas para não dar erro nas validações
    this.contatos[this.contatoIndex] = this.clonarContato(this.contato);
    this.exibindoFormularioContato=false;
    
    frm.reset();
  }

  removerContato(index){
    this.contatos.splice(index,1);
  }

  clonarContato(contato:Contato):Contato{
    return new Contato(contato.codigo, contato.nome, contato.email, contato.telefone);
  }

  get editando(){
    return this.contato && this.contato.codigo;
  }

}

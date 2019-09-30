import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
  <div *ngIf="temErro()" class="ui-message ui-messages-erro">
    {{text}}
  </div>
  `,
  styles: [`
    .ui-messages-erro{
      margin:0px;
      margin-top:4px;
      border-color:white;
      background-color:#ff2b00;
      color:white;
    }
  `]
})
export class MessageComponent {
  
  @Input() error:string;
  @Input() control:FormControl;
  @Input() text :string;

  temErro():boolean{
    return this.control.hasError(this.error) && this.control.dirty;
  }



}

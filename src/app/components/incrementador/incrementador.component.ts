import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  //@Input() progresso:number =100;
  @Input('valor') progresso:number =100;
  @Input() btnClass:string ="btn-primary"

  //@Output() valorSalida:EventEmitter<number>= new EventEmitter();
  @Output('valor') valorSalida:EventEmitter<number>= new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.btnClass= `btn ${this.btnClass}`;
  }

  cambiarValor(valor:number){
    if(this.progresso>=100 && valor>=0){
      this.valorSalida.emit(100);
      this.progresso=100;
    }
    if(this.progresso<=0 && valor<0){
      this.progresso=0;
      this.valorSalida.emit(0);
    }
    this.progresso= this.progresso+valor;
    this.valorSalida.emit(this.progresso);

  }
  onChange(nuevoValor:number){
    if(nuevoValor>=100){
      this.progresso=100;
    } else if(nuevoValor<=0){
      this.progresso=0;
    }else {
      this.progresso = nuevoValor;
    }
    this.valorSalida.emit(this.progresso)

  }
  escribiendo(event:any){
    let valorInput:string = event.target.value;
    if(valorInput.length>3){
      this.progresso=100;
    } else if(valorInput.charAt(0)==="-" || valorInput.charAt(0)===""){
      this.progresso=0;
    }
    this.progresso=parseInt(valorInput);
  }

}

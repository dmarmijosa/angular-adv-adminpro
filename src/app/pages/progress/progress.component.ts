import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls:['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  progresso1: number =5;
  progresso2: number =5;

  get getprogresso1(){
    return `${this.progresso1}%` 
  }
  get getprogresso2(){
    return `${this.progresso2}%` 
  }


  constructor() { }

  ngOnInit(): void {
  }



}

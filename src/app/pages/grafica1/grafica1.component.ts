import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component implements OnInit {
  labels1: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  data: number[] = [100, 50, 20];
  backgroundColor: string[] = ['#8DBAF8', '#232934', '#F05C5A'];
  constructor() {}

  ngOnInit(): void {}
}

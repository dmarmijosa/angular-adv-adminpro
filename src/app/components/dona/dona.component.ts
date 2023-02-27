import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ChartData, ChartEvent, ChartType, Color } from 'chart.js';
@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  @Input() title:string = 'Sin título';
  
  constructor() { }

  ngOnInit(): void {
  }
  @Input('labels') doughnutChartLabels: string[] = [ 'Venta 1', 'Venta 2', 'Venta 3' ];
  @Input('data') data:number[]=[ 100, 100, 100 ];
  @Input('colors') colors:string[]=['#FCA2B5','#FDE09D','#8BC6F1']
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 100, 100, 100 ]
      },
    ]
  };
  ngOnChanges(changes: SimpleChanges): void {
    this.doughnutChartData={
 
      labels: this.doughnutChartLabels,
      datasets:[{ data: this.data, backgroundColor:this.colors}]
   
    }
  }

}

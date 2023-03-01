import { Component, OnInit } from '@angular/core';
import { filter, interval, map, Observable, retry, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnInit {

  public intervalSub: Subscription = new Subscription;

  constructor() {
    // this.retornaObservable().pipe(
    //   retry(1)
    // ).subscribe(
    //   valor=> console.log('Subs', valor),
    //   error=> console.log('ERROR', error),
    //   ()=>console.log('Obs terminado')
    // );
    this.intervalSub = this.retornoIntervalo().subscribe(console.log);
  }

  ngOnInit(): void {
    
  }
  retornoIntervalo = () =>
    interval(500).pipe(
      //take(10),
      map((valor) => valor+1),
      filter(valor=> (valor%2 ===0)? true: false),

    );

  retornaObservable() {
    let i = -1;
    return new Observable<number>((obs) => {
      const interval = setInterval(() => {
        i++;
        obs.next(i);
        if (i === 4) {
          clearInterval(interval);
          obs.complete();
        }
        if (i == 2) {
          i = 0;
          obs.error('hubo error');
        }
      }, 1000);
    });
    //retry
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.intervalSub.unsubscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, pipe, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnInit {
  public titulo: string = '';
  public tituloSub$: Subscription = new Subscription();

  constructor(private router: Router , private actRouter:ActivatedRoute) {
    //console.log(actRouter.children[0].data)
    this.tituloSub$ = this.getParametros().subscribe(({ titulo }) => {
      this.titulo = titulo;
      document.title = titulo;
    });
  }

  ngOnInit(): void {}

  getParametros() {
    return this.router.events.pipe(
      filter((event: any) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.tituloSub$.unsubscribe();
  }
}

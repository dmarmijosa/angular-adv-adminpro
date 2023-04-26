import { Injectable, NgZone } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  bandera: boolean = false;
  constructor(private ususarioService: UsuarioService, private router:Router, private ngZone:NgZone) {}
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.ususarioService
      .validarToken()
      .pipe(tap((estaAutenticado) => {
        if(!estaAutenticado){
             this.router.navigateByUrl('/login');
        }
      }));
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.ususarioService
      .validarToken()
      .pipe(tap((estaAutenticado) => {
        if(!estaAutenticado){
             this.router.navigateByUrl('/login');
        }
      }));
  }
}

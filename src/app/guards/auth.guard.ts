import { Injectable, NgZone } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  bandera: boolean = false;
  constructor(private ususarioService: UsuarioService, private router:Router, private ngZone:NgZone) {}
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

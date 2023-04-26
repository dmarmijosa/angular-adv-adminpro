import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;
declare const google: any;
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public usuario!: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {}
  get role():'ADMIN_ROLE'| 'USER_ROLE'{
    return this.usuario?.role || 'USER_ROLE'

  }
  get uid(): string {
    return this.usuario.uid || '';
  }

  guardarLocalStorage(token:string, menu:any){
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    if (this.usuario.google) {
      google.accounts.id.revoke(this.usuario.email, () => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/login');
        });
      });
    } else {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    }
  }

  validarToken(): Observable<boolean> {
    return this.http.get(`${base_url}/login/renew`).pipe(
      map((resp: any) => {
        const { email, google, img = '', nombre, role, uid } = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
        this.guardarLocalStorage(resp.token,resp.menu);
        return true;
      }),

      catchError((err) => of(false))
    );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        if (resp.ok) {
          this.guardarLocalStorage(resp.token,resp.menu);
        }
      })
    );
  }
  loginUsuario(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        if (resp.ok) {
          this.guardarLocalStorage(resp.token,resp.menu);
        }
      })
    );
  }
  logingoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        //console.log(resp);
        this.guardarLocalStorage(resp.token,resp.menu);
      })
    );
  }
  actualizarPerfil(data: { email: string; nombre: string; role: string }) {
    data = {
      ...data,
      role: this.usuario.role || '',
    };
    return this.http.put(
      `${base_url}/usuarios/${this.uid}`,
      data
    );
  }

  cargarUsuarios(desde: number = 0) {
    return this.http
      .get<{ total: number; usuarios: Usuario[] }>(
        `${base_url}/usuarios?desde=${desde}`
      )
      .pipe(
        map((resp) => {
          const usuarios = resp.usuarios.map(
            (user) =>
              new Usuario(
                user.nombre,
                user.email,
                '',
                user.img,
                user.google,
                user.role,
                user.uid
              )
          );
          return {
            total: resp.total,
            usuarios,
          };
        })
      );
  }
  eliminarUsuario(usuario: Usuario) {
   return this.http.delete(`${base_url}/usuarios/${usuario.uid}`);
  }
  guardarUsuario(data: Usuario) {
    return this.http.put(
      `${base_url}/usuarios/${this.uid}`,
      data
    );
  }
}

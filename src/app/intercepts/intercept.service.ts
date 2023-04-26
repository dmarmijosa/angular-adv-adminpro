import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptService implements HttpInterceptor {
  get token(): string {
    return localStorage.getItem('token') || '';
  }
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      'x-token': this.token
    });
    const reqClone = req.clone({
      headers
    })
    return next.handle(reqClone).pipe(catchError(this.manejarError));
  }

  manejarError(err: HttpErrorResponse) {
    console.log('Sucedio un error');
    console.log('Registrado en el log file');
    console.warn(err);
    return throwError(() => Error('Error personalizado'));
  }
}

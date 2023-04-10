import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  NgZone,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoginForm } from '../../interfaces/login-form.interface';
import Swal from 'sweetalert2';
declare const google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('googleBtn') googleBtn!: ElementRef;
  public formSubmited = false;
  private _codePattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZne: NgZone
  ) {}
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.googleInit();
  }
  googleInit() {
    google.accounts.id.initialize({
      client_id:
        '995042989599-m582bt6o2qrfcvedjbvfgm668fhpgets.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response),
    });

    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: 'outline', size: 'large' } // customization attributes
    );
    google.accounts.id.prompt();
  }
  handleCredentialResponse(response: any) {
    //console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.logingoogle(response.credential).subscribe({
      next: (resp) =>
        this.ngZne.run(() => {
          this.router.navigateByUrl('/');
        }),
    });
  }
  public loginForm = this.fb.group({
    email: [
      localStorage.getItem('email') || 'test1@gmail.com',
      [Validators.required, Validators.pattern(this._codePattern)],
    ],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
    remember: [localStorage.getItem('remember') === 'true' ? true : false],
  });

  campoNoValido(campo: string): boolean {
    return !!this.loginForm.get(campo)?.invalid && this.formSubmited;
  }

  login() {
    this.formSubmited = true;
    if (!this.loginForm.valid) {
      return;
    }
    this.usuarioService
      .loginUsuario(this.loginForm.value as LoginForm)
      .subscribe({
        next: (resp) => {
          if (this.loginForm.get('remember')?.value) {
            localStorage.setItem(
              'email',
              this.loginForm.get('email')?.value as string
            );
            localStorage.setItem(
              'remember',
              String(this.loginForm.value.remember)
            );
          } else {
            localStorage.removeItem('email');
            localStorage.removeItem('remember');
          }

          // Navegar a la ruta deseada después del inicio de sesión exitoso
          this.ngZne.run(() => {
            this.router.navigateByUrl('/');
          });
        },
        error: (err) => Swal.fire('Error', err.error.msg, 'error'),
      });
  }
}

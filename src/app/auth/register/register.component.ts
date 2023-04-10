import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['register.component.css'],
})
export class RegisterComponent implements OnInit {
  public formSubmitted = false;
  private _codePattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  public registerForm = this.fb.group(
    {
      nombre: ['danny', [Validators.required, Validators.minLength(3)]],
      email: [
        'test100@gmail.com',
        [Validators.required, Validators.pattern(this._codePattern)],
      ],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
      password2: ['1234567', [Validators.required, Validators.minLength(6)]],
      terminos: [false, [this.checBoxTerminos]],
    },
    {
      validators: [this.passwordIguales('password', 'password2')],
      // Use AbstractControlOptions for 'validators' parameter
      // instead of FormGroup
    }
  );
  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {}
  crearUsuario() {
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    //Realiza el posteo
    this.usuarioService.crearUsuario(this.registerForm.value).subscribe({
      next: (resp) => {
        console.log('usuario creado');
        console.log(resp);
      },
      error: (err) => {
        //si hay un error
        Swal.fire('Error', err.error.msg, 'error');
      },
    });
  }
  campoNovalido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
  aceptarTerminos(): boolean {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  passwordNovalid(): boolean {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;
    return pass1 !== pass2 && this.formSubmitted;
    
  }
  checBoxTerminos(control: FormControl) {
    if (control.value !== true) {
      return { invalido: true };
    } else {
      return null;
    }
  }

  passwordIguales(password: string, password2: string) {
    return (fg: FormGroup) => {
      const pass1Control = fg.get(password);
      const pass2Control = fg.get(password2);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ diferentes: true });
      }
    };
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [],
})
export class PerfilComponent implements OnInit {
  public perfilForm!: FormGroup;
  public usuario!: Usuario;
  public imagenSubir!: File;
  public imgTemp: string | ArrayBuffer | null = '';

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [
        this.usuario.email,
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    });
  }
  actualizarPerfil() {
    if (this.perfilForm.invalid) {
      return;
    }
    this.usuarioService.actualizarPerfil(this.perfilForm.value).subscribe({
      next: (resp: any) => {
        console.log(resp);
        const { nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        Swal.fire({
          title: 'Guardado',
          text: 'Realizado con éxito.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',
          text: err.error.msg,
          icon: 'error',
          timer: 3000,
          showConfirmButton: false,
        });
      },
    });
  }
  cambiarImagen(file: File) {
    this.imagenSubir = file;
    if (!file) {
      return;
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.imgTemp = reader.result;
      };
    }
  }
  subirImagen() {
    this.fileUploadService
      .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid || '')
      .then((res: any) => {
        this.usuario.img = res;
        Swal.fire({
          title:'Subido con exito',
          text: 'Imagen subida con éxito.',
          timer: 2000,
          icon: 'success',
          showConfirmButton:false
        })
      }).catch((err)=>{
        Swal.fire({
          title:'Error',
          text: 'Existio un error al subir la imagen.',
          timer: 3000,
          icon: 'error',
          showConfirmButton:false
        })
      });
  }
}

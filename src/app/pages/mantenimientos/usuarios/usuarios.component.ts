import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  totalUsuarios: number = 0;
  usuarios: Usuario[] = [];
  usuariosTemp: Usuario[] = [];
  desde: number = 0;
  cargando: boolean = false;

  imgSub!:Subscription;

  constructor(
    private ususarioService: UsuarioService,
    private busquedaService: BusquedasService,
    private modalImagenService: ModalImagenService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSub = this.modalImagenService.nuveaImagen
      .pipe(delay(100))
      .subscribe((img: any) => {
        console.log(img);
        this.cargarUsuarios();
      });
  }
  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }
  cargarUsuarios() {
    this.cargando = true;
    this.ususarioService.cargarUsuarios(this.desde).subscribe({
      next: ({ total, usuarios }) => {
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.totalUsuarios = total;
        this.cargando = false;
      },
    });
  }

  buscar(termino: string) {
    if (termino.trim().length === 0) {
      this.usuarios = this.usuariosTemp;
    }
    this.busquedaService.buscar('usuarios', termino).subscribe({
      next: (resp) => {
        this.usuarios = resp;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  eliminarUsuario(usuario: Usuario) {
    if (usuario.uid === this.ususarioService.uid) {
      Swal.fire('Error', 'No puede borrarse asi mismo');
      return;
    }
    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de eliminar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminarlo',
    }).then((result) => {
      if (result.value) {
        this.ususarioService.eliminarUsuario(usuario).subscribe({
          next: (resp: any) => {
            Swal.fire({
              title: 'Eliminado.',
              text: 'Usuario eliminado con exito.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false,
            });
            this.cargarUsuarios();
          },
        });
      }
    });
  }

  cambiarRole(usuario: Usuario) {
    this.ususarioService.guardarUsuario(usuario).subscribe({
      next: (resp) => {
        console.log(resp);
      },
    });
  }
  abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }

  ngOnDestroy(): void {
    this.imgSub.unsubscribe();
  }
}

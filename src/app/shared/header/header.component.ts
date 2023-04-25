import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  usuario!: Usuario;
  formularioHidden:boolean = false;

  constructor(private ususarioService: UsuarioService, private router: Router) {
    this.usuario = ususarioService.usuario;
  }

  ngOnInit(): void {}

  logout() {
    this.ususarioService.logout();
  }
  buscar(termino: string) {
    if (termino.trim().length === 0) {
      this.formularioHidden=false;
      return;
    }
    this.router.navigateByUrl(`dashboard/busqueda/${termino}`);
  }
}

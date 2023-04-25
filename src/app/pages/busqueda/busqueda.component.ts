import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [],
})
export class BusquedaComponent implements OnInit {
  usuarios:Usuario[]=[];
  medicos:Medico[]=[];
  hospitales:Hospital[]=[];
  termino: string = '';
  constructor(
    private activateRouter: ActivatedRoute,
    private busquedaService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.activateRouter.params.subscribe(({ termino }) => this.busquedaGlobal(termino));
  }

  busquedaGlobal(termino: string) {
    this.busquedaService.buscquedaGlobal(termino).subscribe((busqueda:any)=>{
      this.hospitales =  busqueda.hospitales;
      this.usuarios = busqueda.usuarios;
      this.medicos = busqueda.medicos;
    })
  }
}

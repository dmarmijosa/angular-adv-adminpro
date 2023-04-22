import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription, delay } from 'rxjs';
import { BusquedasService } from 'src/app/services/busquedas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [],
})
export class MedicosComponent implements OnInit {
  public cargando: boolean = true;
  public medicos: Medico[] = [];
  private imgSubs!: Subscription;

  constructor( private medicoService: MedicoService,
               private modalImagenService: ModalImagenService,
               private busquedasService: BusquedasService ) { }
  
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => this.cargarMedicos() );
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.getMedicos()
      .subscribe( (medicos:any) => {
        this.cargando = false;
        this.medicos = medicos;
      });
  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.cargarMedicos();
    }

    this.busquedasService.buscar( 'medicos', termino )
        .subscribe( resp => {
          this.medicos = resp;
        });
  }

  abrirModal(medico: Medico) {

    this.modalImagenService.abrirModal( 'medicos', medico._id || '', medico.img );

  }

  borrarMedico( medico: Medico ) {

    Swal.fire({
      title: '¿Borrar médico?',
      text: `Esta a punto de eliminar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminarlo',
    }).then((result) => {
      if (result.value) {
        this.medicoService.borrarMedico(medico._id || '').subscribe({
          next: (resp: any) => {
            Swal.fire({
              title: 'Eliminado.',
              text: 'Usuario eliminado con exito.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false,
            });
            this.cargarMedicos();
          },
        });
      }
    });

  }

}

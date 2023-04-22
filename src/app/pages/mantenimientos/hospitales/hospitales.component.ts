import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription, delay } from 'rxjs';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [],
})
export class HospitalesComponent implements OnInit {
  public hospitales: Hospital[] = [];
  constructor(
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedasService:BusquedasService
  ) {}
  public cargando: boolean = true;
  imgSub!: Subscription;

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSub = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img: any) => {
       this.cargarHospitales();
      });
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales().subscribe((hospitales) => {
      this.cargando = false;
      this.hospitales = hospitales;
    });
  }
  guardarcambios(hospital: Hospital) {
    this.hospitalService
      .actualizarHospital(hospital._id || '', hospital.nombre)
      .subscribe(() => {
        Swal.fire({
          title: 'Actualización',
          text: 'La actualización se realizó con exito.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
      });
  }
  eliminarHospital(hospital: Hospital) {
    Swal.fire({
      title: '¿Borrar hospital?',
      text: `Esta a punto de eliminar a ${hospital.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminarlo',
    }).then((result) => {
      if (result.value) {
        this.hospitalService.eliminarHospital(hospital._id || '').subscribe({
          next: () => {
            Swal.fire({
              title: 'Eliminado.',
              text: 'Usuario eliminado con exito.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false,
            });
            this.cargarHospitales();
          },
        });
      }
    });
  }
  async abrirSwal() {
    const { value = ''} = await Swal.fire({
      title: 'Escriba el nombre del hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    });
    if (value.trim().length > 0) {
      this.hospitalService.crearHospital(value).subscribe({
        next: (resp: any) => {
          this.hospitales.push(resp.hospital);
        },
      });
    }
  }
  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal(
      'hospitales',
      hospital._id || '',
      hospital.img
    );
  }
  busquedaHospital(termino:string){
    if(termino.trim().length <= 0 ){
      return this.cargarHospitales();
    }
    this.busquedasService.buscar('hospitales', termino).subscribe((resp)=>{
      this.hospitales = resp as Hospital[];
    })

  }
}

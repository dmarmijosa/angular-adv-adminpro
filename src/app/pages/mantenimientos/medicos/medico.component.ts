import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [],
})
export class MedicoComponent implements OnInit {
  public medicForm!: FormGroup;
  hospitales: Hospital[] = [];
  hospitalesSeleccionado?: Hospital;
  medicoSelecionado!: Medico;

  constructor(
    private fb: FormBuilder,
    private hospitaService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(({ id }) => {
      this.cargarMedico(id);
    });

    this.medicForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['0', Validators.required],
    });
    this.cargarHospitales();

    this.medicForm
      .get('hospital')
      ?.valueChanges.subscribe((hospitalId: string) => {
        this.hospitalesSeleccionado =
          this.hospitales.find((item) => item._id === hospitalId) ?? undefined;
      });
  }
  cargarMedico(id: string) {
    if (id === 'nuevo') {
      return;
    }
    this.medicoService.getMedicoById(id).subscribe((medico: any) => {
      if(!medico){
        this.router.navigateByUrl(`/dashboard/medicos`);
      }
      const {
        nombre,
        hospital: { _id },
      } = medico;
      this.medicoSelecionado = medico;
      this.medicForm.setValue({ nombre, hospital: _id });
    });
  }
  guardarMedico() {
    if (this.medicoSelecionado) {
      // actualizar
      const data = {
        ...this.medicForm.value,
        _id: this.medicoSelecionado._id,
      };
      this.medicoService.actualizarMedicos(data).subscribe((resp: any) => {
        Swal.fire({
          title: 'Actualizar.',
          text: `Se ha actualizado el médico ${data.nombre} ha sido actualizado con exito.`,
          showConfirmButton: false,
          timer: 2500,
          icon: 'success',
        });
      });
    } else {
      //crear
      console.log(this.medicoSelecionado);
      const { nombre } = this.medicForm.value;
      this.medicoService
        .crearMedicos(this.medicForm.value)
        .subscribe((resp: any) => {
          Swal.fire({
            title: 'Creado.',
            text: `Se ha creado el medico ${nombre} con exito`,
            showConfirmButton: false,
            timer: 2000,
            icon: 'success',
          });
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
        });
      this.medicForm.setValue({ nombre: '', hospital: '0' });
    }
  }

  cargarHospitales() {
    this.hospitaService.cargarHospitales().subscribe((hospital: Hospital[]) => {
      this.hospitales = hospital;
    });
  }
}

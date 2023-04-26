import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';
import { map } from 'rxjs/operators';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  constructor(private http: HttpClient) {}
  getMedicos() {
    return this.http
      .get(`${base_url}/medicos`)
      .pipe(map((resp: { ok?: boolean; medicos?: Medico[] }) => resp?.medicos));
  }
  crearMedicos(medico: { nombre: string; hospital: string }) {
    const url = `${base_url}/medicos`;
    return this.http.post(url, medico);
  }
  getMedicoById(id: string) {
    const url = `${base_url}/medicos/${id}`;
    return this.http
      .get(url)
      .pipe(map((resp: { ok?: boolean; medico?: Medico[] }) => resp?.medico));
  }
  actualizarMedicos(medico: Medico) {
    const url = `${base_url}/medicos/${medico._id}`;
    return this.http.put(url, medico);
  }
  borrarMedico(_id: string) {
    const url = `${base_url}/medicos/${_id}`;
    return this.http.delete(url);
  }
}

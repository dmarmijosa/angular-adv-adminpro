import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class ModalImagenService {
  constructor() {}
  public _ocultarModal: boolean = true;
  public tipo!: 'usuarios' | 'medicos' | 'hospitales';
  public id: string = '';
  public img: string = 'no-img';
  public nuveaImagen:EventEmitter<string> = new EventEmitter<string>()

  get ocultarModal() {
    return this._ocultarModal;
  }
  abrirModal(
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string,
    img: string = ''
  ) {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    console.log(id);
    console.log(img);

    this.img =
      img.trim().length > 0
        ? img.includes('https')
          ? img
          : `${base_url}/upload/${tipo}/${img}`
        : `${base_url}/upload/${tipo}/no-image`;

    //this.img = img;
  }
  cerrarModal() {
    this._ocultarModal = true;
  }
}

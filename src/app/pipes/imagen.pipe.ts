import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url;
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {


  transform(img?:string, tipo?:'usuarios'| 'medicos'|'hospitales'){
    if (img?.includes('https')) {
      return img;
    }
    return `${base_url}/upload/${tipo ?? 'usuarios'}/${img ?? 'no-image'}`;
  }
  // OPEN ENGLISH (Fernanda Aragua) 900876319

}

import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-model-imagen',
  templateUrl: './model-imagen.component.html',
  styles: [
  ]
})
export class ModelImagenComponent implements OnInit {
  
  public imagenSubir!: File;
  public imgTemp: string | ArrayBuffer | null = '';
  constructor(public modalImagenService: ModalImagenService, public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
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
  cerrarModal(){
    this.imgTemp=null;
    this.modalImagenService.cerrarModal();
  }
  subirImagen() {
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;
    this.fileUploadService
      .actualizarFoto(this.imagenSubir,tipo, id)
      .then((res: any) => {
        Swal.fire({
          title:'Subido con exito',
          text: 'Imagen subida con éxito.',
          timer: 2000,
          icon: 'success',
          showConfirmButton:false
        });
        this.modalImagenService.nuevaImagen.emit(res);
        this.cerrarModal();
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

import { Component, OnInit } from '@angular/core';
import { FileuploadService } from 'src/app/services/fileupload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir: File;
  public imagenTemp: any = null;

  constructor( public modalImagenService: ModalImagenService, public fileUploadService: FileuploadService ) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen( file: File ) {
    this.imagenSubir = file;

    if (!file) { 
      return this.imagenTemp = null;
     }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      // console.log(reader.result);
      this.imagenTemp = reader.result;
    }

  }

  subirImagen() {
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService.actualizarFoto(this.imagenSubir, tipo, id)
      .then( resp => {
        Swal.fire('Guardado', 'Imagen actualizada 😄', 'success');
        this.modalImagenService.imagenModificada.emit(resp);
        this.cerrarModal();
      })
      .catch( err => {
        console.error(err);
        Swal.fire('Error', 'No se pudo actualizar la imagen 😕', 'error');
      });
  }

}

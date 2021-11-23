import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario.model';
import { FileuploadService } from 'src/app/services/fileupload.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imagenTemp: any = null;

  constructor( private fb: FormBuilder, private usuarioService: UsuarioService, private fileUploadService: FileuploadService ) { 
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre, Validators.required ],
      alias: [ this.usuario.alias , Validators.required ],
      email: [ this.usuario.email , [Validators.required, Validators.email] ]
    });
  }

  actualizarPerfil() {
    
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
    .subscribe( resp => {
      const { nombre, email } = this.perfilForm.value;

      this.usuario.nombre = nombre;
      this.usuario.email = email;

      Swal.fire('Guardado', 'Cambios realizados 👌', 'success');

    }, (err) => {
      console.error(err);
      Swal.fire('Error', (err.error.msg || err.statusText), 'error');
    });
  }

  cambiarImagen( file: File ) {
    this.imagenSubir = file;

    if (!file) { 
      return this.imagenTemp = null;
     }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      console.log(reader.result);
      this.imagenTemp = reader.result;
    }

  }

  subirImagen() {
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
      .then( resp => {
        this.usuario.img = resp;
        Swal.fire('Guardado', 'Imagen actualizada 😄', 'success');
      })
      .catch( err => {
        console.error(err);
        Swal.fire('Error', 'No se pudo actualizar la imagen 😕', 'error');
      });
  }

}

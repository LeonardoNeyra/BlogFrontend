import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public paginacionDesde: number = 0;
  public paginacionHasta: number = 5;
  public isLoaded: boolean = true;
  public imgSubs: Subscription;

  constructor( private usuarioService: UsuarioService,
               private busquedaService: BusquedasService,
               private modalImagenService: ModalImagenService ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.imagenModificada
      .pipe(
        delay(500)
      )
      .subscribe( img => this.cargarUsuarios() ); // observable
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarUsuarios() {
    this.isLoaded = true;
    this.usuarioService.cargarUsuarios(this.paginacionDesde)
      .subscribe( ({ total, usuarios }) => {
        this.totalUsuarios = total;

        if (usuarios.length !== 0) {
          this.usuarios = usuarios;
          this.usuariosTemp = usuarios;
        }

        this.isLoaded = false;

      });
  }

  cambiarPagina(nuevoDesde: number) {
    this.paginacionDesde += nuevoDesde;
    this.paginacionHasta += nuevoDesde;

    if (this.paginacionDesde < 0 ) {
      this.paginacionDesde = 0;
      this.paginacionHasta = 5;
    }
    else if (this.paginacionDesde >= this.totalUsuarios) {
      this.paginacionDesde -= nuevoDesde;
      this.paginacionHasta = this.totalUsuarios;
    }

    this.cargarUsuarios();
  }

  buscar( termino: string = '' ) {

    if (termino.length === 0) {
      return this.usuarios = this.usuariosTemp;
    }

    this.busquedaService.buscar('usuarios', termino)
      .subscribe(resp => {
        this.usuarios = resp;
      });
  }

  eliminar( usuario: Usuario ) {

    if (usuario.uid === this.usuarioService.uid) {
      return Swal.fire('Error', 'No puede borrarse a si mismo 🤦', 'error');
    }

    Swal.fire({
      title: '¿Seguro de eliminar al usuario?',
      text: `Se borrará el usuario ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sip, bórralo.'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.eliminarUsuario(usuario)
          .subscribe( resp => {
            
            this.cargarUsuarios();
            Swal.fire('Usuario borrado', `${usuario.nombre} fue eliminado ❌`, 'success');
          });
        
      }
    });
  }

  cambiarRol(usuario: Usuario) {
    
    this.usuarioService.actualizarUsuario(usuario)
    .subscribe(resp => {
        console.log(resp);
    });
  }

  abrirModal(usuario: Usuario) {
    console.log(usuario);
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }

}

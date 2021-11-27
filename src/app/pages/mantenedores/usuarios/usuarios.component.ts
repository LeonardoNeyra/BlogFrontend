import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public paginacionDesde: number = 0;
  public paginacionHasta: number = 5;

  constructor( private usuarioService: UsuarioService ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.cargarUsuarios(this.paginacionDesde)
      .subscribe( ({ total, usuarios }) => {
        this.totalUsuarios = total;
        
        if (usuarios.length !== 0) {
          this.usuarios = usuarios;
        }

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

}

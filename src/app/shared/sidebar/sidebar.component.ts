import { Component, ElementRef, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebardService } from 'src/app/services/sidebard.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public usuario: Usuario;
  public menu: any[];
  public showMenu: boolean = false;

  constructor( private usuarioService: UsuarioService, private sidebarService: SidebardService, private elRef: ElementRef ) {
    this.usuario = usuarioService.usuario;
    this.menu = sidebarService.menu;
  }

  ngOnInit(): void {
    // console.log( this.elRef.nativeElement );
  }

  abrirSubMenu( input: HTMLLIElement ) {
    input.classList.toggle("showMenu");
  }

  logout() {
    this.usuarioService.logout();
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  public usuario: Usuario;

  constructor( private usuarioService: UsuarioService) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    // Scrolling Effect
    $(window).on("scroll", function() {
      if($(window).scrollTop()) {
        $('nav').addClass('black');
      }
      else {
        $('nav').removeClass('black');
      }
    });

  }

  logout() {
    this.usuarioService.logout();
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  constructor( private usuarioService: UsuarioService) { }

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

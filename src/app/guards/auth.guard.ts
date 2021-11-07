import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private usuarioService: UsuarioService, private router: Router ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      // this.usuarioService.valirToken()
      //   .subscribe( resp => {
      //     console.log(resp);
      //   });

      return this.usuarioService.valirToken()
        .pipe(
          tap( autenticado => {
            if (!autenticado) {
              this.router.navigateByUrl('/login');
            }
          })
        );
    }
  
}

import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  /*
  * Parametros & Constructor
  */
  public auth2: any;
  public usuario: Usuario;

  constructor( private http: HttpClient, private router: Router, private ngZone: NgZone ) {
    this.googleInit();
   }

   get token(): string {
     return localStorage.getItem('token') || '';
   }

   get uid(): string {
     return this.usuario.uid || '';
   }

   /*
   *  Funciones
   */
  googleInit() {

    return new Promise<void>( resolve => {

      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '148538041245-fti8m1m48ivii5jipcilaqtcsvilutj2.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        }); 

        resolve();
      });

    })
  }

  // Logout
  logout() {
    localStorage.removeItem('token');

    // cerra sesión de google singin
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  // Renovar token
  valirToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any) => {
        const { activo, alias, email, fechaCrea, google, img = '', nombre, rol, uid } = resp.usuario;

        this.usuario = new Usuario( nombre, alias, email, google, rol, activo, fechaCrea, '', img, uid );
        localStorage.setItem('token', resp.token);

        return true;
      }),
      catchError( err => of(false) )
    );
  }

  // Crear usuario -> Register
  crearUsuario( formData: RegisterForm ) {
    return this.http.post(`${base_url}/usuarios`, formData)
            .pipe(
              tap( (resp: any) => {
                localStorage.setItem('token', resp.token);
              })
            )
  }

  // Login convencional
  login( formData: LoginForm ) {

    if (formData.remember) {
      localStorage.setItem('email', formData.email);
    }
    else {
      localStorage.removeItem('email');
    }

    return this.http.post(`${base_url}/login`, formData)
              .pipe(
                tap((resp : any) => {
                  localStorage.setItem('token', resp.token);
                })
              );
  }

  // Login Google
  loginGoogle( token ) {

    return this.http.post(`${base_url}/login/google`, { token })
              .pipe(
                tap((resp : any) => {
                  localStorage.setItem('token', resp.token);
                })
              );
  }

  // actualizar usuario (perfil)
  actualizarPerfil( data: { email: string, nombre: string, alias: string, rol: string } ) {

    data = {
      ...data,
      rol: this.usuario.rol
    }
    
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    });

  }

}
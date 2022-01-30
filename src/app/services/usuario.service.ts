import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
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

   get rol(): 'ADMIN_ROLE' | 'USER_ROL' {
     return this.usuario.rol;
   }

   get uid(): string {
     return this.usuario.uid || '';
   }

   get headers() {
     return {
       headers: {
         'x-token': this.token
       }
     }
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

  guardarLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

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
        
        this.guardarLocalStorage(resp.token, resp.menu);

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
                this.guardarLocalStorage(resp.token, resp.menu);
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
                  this.guardarLocalStorage(resp.token, resp.menu);
                })
              );
  }

  // Login Google
  loginGoogle( token ) {

    return this.http.post(`${base_url}/login/google`, { token })
              .pipe(
                tap((resp : any) => {
                  this.guardarLocalStorage(resp.token, resp.menu);
                })
              );
  }

  // Actualizar usuario (perfil)
  actualizarPerfil( data: { email: string, nombre: string, alias: string, rol: string } ) {

    data = {
      ...data,
      rol: this.usuario.rol
    }
    
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);

  }

  // Cargar usuarios
  cargarUsuarios( desde: number = 0 ) {
    const url = `${base_url}/usuarios?desde=${desde}`

    return this.http.get<CargarUsuario>(url, this.headers)
      .pipe(
        // delay(500),
        map( resp => {
          const usuarios = resp.usuarios
            .map(user => new Usuario(user.nombre, user.alias, user.email, user.google, user.rol, true, user.fechaCrea, '', user.img, user.uid));
          
          return {
            total: resp.total,
            usuarios
          };
        })
      )
  }
 
  // Eliminar usuario
  eliminarUsuario( usuario: Usuario ) {
    const url = `${base_url}/usuarios/${usuario.uid}`;

    return this.http.delete(url, this.headers);

  }

  // Actualizar un usuario desde el CRUD
  actualizarUsuario( usuario: Usuario ) {

    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);

  }

  // Agregar un post favorito al usuario
  agregarPostFavorito( postId: string ) {
    return this.http.put(`${base_url}/usuarios/favoritos/${postId}`, this.headers);
  }
}
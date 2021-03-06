import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post.model';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http:HttpClient ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  private transformarUsuarios( resultados: any ): Usuario[] {
    return resultados.map(
      user => new Usuario(user.nombre, user.alias, user.email, user.google, 'USER_ROL', true, user.fechaCrea, '', user.img, user.uid)
    );
  }

  private transformarPosts( resultados: any ): Post[] {
    return resultados;
  }

  buscar( tipo: 'usuarios'|'posts'|'comentarios', termino: string = '' ) {
    
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;

    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map( (resp: any) => {
          switch (tipo) {
            case 'usuarios':
              return this.transformarUsuarios( resp.resultados );
            
            case 'posts':
              return this.transformarPosts( resp.resultados );

            default:
              return [];
          }
        })
      );

  }
}

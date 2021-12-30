import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Comentario } from '../models/comentario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor( private http: HttpClient ) { }

  /*
  * Setter & Getter
  */
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


  /*
  * Métodos
  */
  cargarComentariosByPost( idPost: string ) {
    const url = `${base_url}/comentarios/${idPost}`

    return this.http.get(url, this.headers)
      .pipe(
        map( (resp: {ok: boolean, comentarios: Comentario[]}) => resp.comentarios)
      );
  }

  crearComentario( postId: string, descripcion: string, comentarioPadreId: string = '' ) {
    
    if (comentarioPadreId.length == 0) { // Comentario padre
      let url = `${base_url}/comentarios`
      return this.http.post(url, { post: postId, descripcion }, this.headers);
    }
    else { // Comentario hijo
      let url = `${base_url}/comentarios/respuesta`
      return this.http.post(url, { post: postId, comentarioPadre: comentarioPadreId, descripcion }, this.headers);
    }
  }

}

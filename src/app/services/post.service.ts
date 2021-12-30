import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PostService {


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
  cargarPosts() {
    const url = `${base_url}/posts`

    return this.http.get(url, this.headers)
      .pipe(
        map( (resp: {ok: boolean, posts: Post[]}) => resp.posts)
      );
  }

  crearPosts( titulo: string, cuerpo: string ) {
    const url = `${base_url}/posts`

    return this.http.post(url, { titulo, cuerpo }, this.headers);
  }

  actualizarPosts( _id: string, titulo: string, cuerpo: string ) {
    const url = `${base_url}/posts/${_id}`

    return this.http.put(url, { titulo, cuerpo }, this.headers);
  }

  eliminarPosts( _id: string ) {
    const url = `${base_url}/posts/${_id}`

    return this.http.delete(url, this.headers);
  }

  obtenerUnPost( id: string ) {
    const url = `${base_url}/posts/${id}`

    return this.http.get(url, this.headers)
      .pipe(
        map( (resp: {ok: boolean, post: Post}) => resp.post)
      );
  }
}

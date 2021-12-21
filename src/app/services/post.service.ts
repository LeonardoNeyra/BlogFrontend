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
}

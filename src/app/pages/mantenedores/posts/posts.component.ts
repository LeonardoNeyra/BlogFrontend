import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  public posts: Post[] = [];
  public cargando: boolean = true;

  constructor( private postService: PostService ) { }

  ngOnInit(): void {
    this.cargarPost();
  }

  cargarPost() {
    this.cargando = true;
    this.postService.cargarPosts()
      .subscribe( resp => {
        this.cargando = false;
        this.posts = resp;
        console.log(resp);
      });
  }

}

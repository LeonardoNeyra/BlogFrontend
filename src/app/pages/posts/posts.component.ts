import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  public postsItems: Post[] = [];

  constructor( private postService:PostService ) { 
    
  }

  ngOnInit(): void {

    this.postService.cargarPosts()
      .subscribe( resp => {
        console.log(resp);
        this.postsItems = resp;
      });
  }

}

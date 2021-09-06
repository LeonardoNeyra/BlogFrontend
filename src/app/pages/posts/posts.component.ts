import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  postsItems: any[];

  constructor(private postsService:PostsService) { 
    this.postsItems = postsService.posts;
  }

  ngOnInit(): void {
  }

}

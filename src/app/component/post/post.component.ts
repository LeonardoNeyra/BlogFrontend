import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() titulo:string = "Sin título :c";
  @Input() autor:string = "Stephanie Giss";
  @Input() cuerpo:string = "No hay texto uwu";
  @Input() fecha:Date = new Date();
  @Input() n_comentarios:number = 0;
  @Input() n_favoritos:number = 0;
  @Input() tags:string[] = ["tag 1", "tag 2", "tag 3", "tag 4"];

  constructor() { }

  ngOnInit(): void {
  }

}

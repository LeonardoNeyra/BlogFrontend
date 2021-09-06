import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  posts:any[] = [
    {
      titulo: "Titulo del post 1",
      cuerpo: "Cuerpo del post 1",
      autor: "Giss",
      fecha: new Date(),
      comentarios: 4,
      favoritos: 1,
      tags: [
        "Psicologia", 
        "Practica"
      ]
    },
    {
      titulo: "Titulo del post 2",
      cuerpo: "Cuerpo del post 2",
      autor: "Alem CE",
      fecha: new Date(),
      comentarios: 3,
      favoritos: 2,
      tags: [
        "Matemáticas",
        "Laboratorio",
      ]
    },
    {
      titulo: "Titulo del post 3",
      cuerpo: "Cuerpo del post 3",
      autor: "Leonardo NO",
      fecha: new Date(),
      comentarios: 7,
      favoritos: 8,
      tags: [
        "Lenguaje",
        "Laboratorio",
      ]
    },
  ]

  constructor() { }
}

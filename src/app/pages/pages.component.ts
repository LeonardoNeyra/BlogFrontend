import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  title   : string = 'The King Team';
  subtitle: string = 'Somos de 2° de secundaria. Te ayudaremos en tus tareas. Comparte el blog :D';

  constructor() { }

  ngOnInit(): void {
  }

}

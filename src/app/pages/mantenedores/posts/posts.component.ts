import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Post } from 'src/app/models/post.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { PostService } from 'src/app/services/post.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  public posts: Post[] = [];
  public cargando: boolean = true;
  private imgSubs: Subscription;

  constructor( private postService: PostService, private modalImagenService: ModalImagenService, private busquedaService: BusquedasService ) { }

  ngOnInit(): void {
    this.cargarPost();

    this.imgSubs = this.modalImagenService.imagenModificada
      .pipe(
        delay(500)
      )
      .subscribe( img => this.cargarPost() ); // observable
  }

  cargarPost() {
    this.cargando = true;
    this.postService.cargarPosts()
      .subscribe( resp => {
        this.cargando = false;
        this.posts = resp;
        // console.log(resp);
      });
  }

  guardarCambios( post: Post ) {
    this.postService.actualizarPosts(post.id, post.titulo, post.cuerpo)
      .subscribe( resp => {
        Swal.fire('Actualizado 👌', post.titulo, 'success');
      });

  }

  eliminarPost( post: Post ) {
    this.postService.eliminarPosts(post.id)
      .subscribe( resp => {
        this.cargarPost();
        Swal.fire('Eliminado ❌', post.titulo, 'success');
      });
  }

  async abrirSweetAlertCrear() {
    const { isConfirmed, value } = await Swal.fire({
      title: 'Crear post',
      text: 'Ingrese titulo y descripción',
      html:
        '<input id="swal-input1" type="text" class="swal2-input" placeholder="Titulo">' +
        '<textarea id="swal-input2" class="swal2-input"></textarea>',
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        return [
          (<HTMLInputElement>document.getElementById('swal-input1')).value,
          (<HTMLInputElement>document.getElementById('swal-input2')).value
        ]
      }
    })
    
    if (isConfirmed && value[0].trim().length > 0 && value[1].trim().length > 0) {
      console.log(value);
      this.postService.crearPosts(value[0].trim(), value[1].trim())
        .subscribe( (resp: any) => {
          // console.log(resp);
          this.posts.push(resp.post);
        });
    }
  }

  abrirModal( post: Post ) {
    this.modalImagenService.abrirModal('posts', post.id, post.img);
  }

  buscarTermino( termino: string = '' ) {

    if (termino.length === 0) {
      return this.cargarPost();
    }

    this.busquedaService.buscar('posts', termino)
      .subscribe((resp: any) => {
        this.posts = resp;
      });
  }

}

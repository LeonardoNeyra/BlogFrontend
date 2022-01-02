import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comentario } from 'src/app/models/comentario.model';
import { Post } from 'src/app/models/post.model';
import { ComentarioService } from 'src/app/services/comentario.service';
import { PostService } from 'src/app/services/post.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-unico',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public usuarioId: string;
  public post: Post = new Post('', '', '', 0, 0, true, new Date);
  public comentarios: Comentario[] = [];
  public cargando: boolean = true;
  public nComentarios: number = 0;
  public cargandoComentarios: boolean = true;
  public inputComentarioHijo: boolean = false;

  @ViewChild("nuevoComentario") nc: ElementRef;

  constructor( private rutaActiva: ActivatedRoute, private postService: PostService, private comentarioService: ComentarioService, private usuarioService: UsuarioService ) { }

  ngOnInit(): void {
    this.usuarioId = this.usuarioService.uid;
    const postId = this.rutaActiva.snapshot.params.id;
    
    this.cargarPost(postId);
    this.cargarComentarios(postId);
  }

  cargarPost( postId: string ) {
    this.cargando = true;
    
    this.postService.obtenerUnPost(postId)
      .subscribe( (resp: Post) => {
        // console.log(resp);
        this.post = resp;
        this.cargando = false;
      });
  }

  cargarComentarios( postId: string ) {
    this.cargandoComentarios = true;
    this.nComentarios = 0;

    this.comentarioService.cargarComentariosByPost(postId)
      .subscribe( resp => {
        console.log(resp);
        this.comentarios = resp;

        for (let i = 0; i < resp.length; i++) {
          this.nComentarios = this.nComentarios + 1;
          
          for (let j = 0; j < resp[i].respuestas.length; j++) {
            this.nComentarios = this.nComentarios + 1;
          }
        }

        this.cargandoComentarios = false;
      });
  }

  crearComentario( post: Post ) {
    const nuevoComentario = this.nc.nativeElement.value.trim();

    if (nuevoComentario.length === 0) {
      Swal.fire('Ops!', 'Comentario vacío', 'warning');
    }
    else {
      this.comentarioService.crearComentario(post.id, nuevoComentario)
        .subscribe(resp => {
          this.cargarComentarios(post.id);
          console.log(resp);
        });
    }

  }

  showHideComentarioHijo( comentarioId: string, tipo: number ) {
    if (tipo == 1) {
      document.getElementById("ch_" + comentarioId).style.display = 'block';
    }
    else {
      document.getElementById("ch_" + comentarioId).style.display = 'none';
    }
  }

  crearComentarioHijo( post: Post, comentario: Comentario ) {
    const comentarioHijo = (<HTMLTextAreaElement>document.getElementById("ta_" + comentario.id)).value.trim();

    if (comentarioHijo.length === 0) {
      Swal.fire('Ops!', 'Su respuesta al comentario de ' + comentario.usuario.nombre + ' está vacío.', 'warning');
    }
    else {
      this.comentarioService.crearComentario(post.id, comentarioHijo, comentario.id)
        .subscribe(resp => {
          this.cargarComentarios(post.id);
          console.log(resp);
        });
    }

  }

  eliminarComentario( comentarioId: string, postId: string ) {

    Swal.fire({
      title: '¿Seguro de eliminar al comentario?',
      text: `Se borrará su comentario 😢`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sip, bórralo.'
    }).then((result) => {
      if (result.value) {
        
        this.comentarioService.eliminarComentario(comentarioId)
          .subscribe(resp => {
            console.log(resp);
            this.cargarComentarios(postId);
          });
        
        Swal.fire('Comentario borrado', `Su comentario fue eliminado ❌`, 'success');
        
      }
    });
  }

  showHideModificarComentario( comentarioId: string, tipo: number ) {

    if (tipo === 1) {
      document.getElementById("div_editar_" + comentarioId).style.display = 'block';
      document.getElementById("p_" + comentarioId).style.display = 'none';
    }
    else {
      document.getElementById("div_editar_" + comentarioId).style.display = 'none';
      document.getElementById("p_" + comentarioId).style.display = 'block';
    }
  }

  editarComentario( comentarioId: string, postId: string ) {

    const nuevoComentario = (<HTMLInputElement>document.getElementById("input_editar_" + comentarioId)).value.trim();

    if (nuevoComentario.length == 0) {
      Swal.fire('Ops!', 'La respuesta está vacía', 'warning');
    }
    else {
      this.comentarioService.actualizarComentario(comentarioId, nuevoComentario)
        .subscribe( (resp) => {
          console.log(resp);
          
          if (resp.ok) {
            this.cargarComentarios(postId);
            Swal.fire('Todo okas', 'Comentario editado 😊', 'success');
          }
          
        }, (error) => {

          if (!error.error.ok) {
            console.log(error.error);
            Swal.fire('Ops!', 'Error en backup, comunicarse con el administrador ☠️', 'error');
          }
          
        });
    }
    
  }
}
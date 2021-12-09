import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CudComponent } from './cud/cud.component';
import { PostsComponent } from './posts/posts.component';
import { AboutComponent } from './about/about.component';
import { PagesComponent } from './pages.component';
import { PostComponent } from '../component/post/post.component';
import { JumbotronComponent } from '../component/jumbotron/jumbotron.component';
import { SharedModule } from '../shared/shared.module';
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosComponent } from './mantenedores/usuarios/usuarios.component';
import { ModalImagenComponent } from '../component/modal-imagen/modal-imagen.component';



@NgModule({
  declarations: [
    CudComponent,
    PostsComponent,
    AboutComponent,
    JumbotronComponent,
    ModalImagenComponent,
    PostComponent,
    PagesComponent,
    PerfilComponent,
    UsuariosComponent
  ],
  exports: [
    CudComponent,
    PostsComponent,
    AboutComponent,
    PostComponent,
    PagesComponent,
    ModalImagenComponent,
  ], 
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }

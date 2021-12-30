import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CudComponent } from './cud/cud.component';
import { PostsComponent } from './posts/posts.component';
import { AboutComponent } from './about/about.component';
import { PagesComponent } from './pages.component';
import { PostComponent as PostComponentComponent } from '../component/post/post.component';
import { JumbotronComponent } from '../component/jumbotron/jumbotron.component';
import { SharedModule } from '../shared/shared.module';
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosComponent } from './mantenedores/usuarios/usuarios.component';
import { PostsComponent as PostsCrudComponent  } from './mantenedores/posts/posts.component';
import { ModalImagenComponent } from '../component/modal-imagen/modal-imagen.component';
import { PipesModule } from '../pipes/pipes.module';
import { PostComponent } from './post/post.component';


@NgModule({
  declarations: [
    CudComponent,
    PostsComponent,
    AboutComponent,
    JumbotronComponent,
    ModalImagenComponent,
    PostComponentComponent,
    PostComponent,
    PagesComponent,
    PerfilComponent,
    UsuariosComponent,
    PostsCrudComponent
  ],
  exports: [
    CudComponent,
    PostComponent,
    PostsComponent,
    AboutComponent,
    PostComponentComponent,
    PagesComponent,
    ModalImagenComponent,
  ], 
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class PagesModule { }

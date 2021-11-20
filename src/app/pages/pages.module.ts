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
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CudComponent,
    PostsComponent,
    AboutComponent,
    JumbotronComponent,
    PostComponent,
    PagesComponent,
    PerfilComponent
  ],
  exports: [
    CudComponent,
    PostsComponent,
    AboutComponent,
    PostComponent,
    PagesComponent
  ], 
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }

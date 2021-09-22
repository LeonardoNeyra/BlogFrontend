import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { PostsComponent } from './pages/posts/posts.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { PostComponent } from './pages/post/post.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';


const routes: Routes = [
  { 
    path: '',
    component: PagesComponent,
    children: [
      { path: 'posts',  component: PostsComponent },
      { path: 'about',  component: AboutComponent },
      { path: 'post', component: PostComponent },
      { path: '', redirectTo: '/posts', pathMatch: 'full' },
    ]
  },

  { path: 'login', component: LoginComponent },
  
  { path: '**', component: NopagefoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

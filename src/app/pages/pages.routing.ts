import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { PostsComponent } from './posts/posts.component';
import { AboutComponent } from './about/about.component';
import { PostComponent } from './post/post.component';
import { CudComponent } from './cud/cud.component';


const routes: Routes = [
    { 
        path: '',
        component: PagesComponent,
        children: [
          { path: 'home',  component: PostsComponent },
          { path: 'about',  component: AboutComponent },
          { path: 'home/posts', component: PostComponent },
          { path: 'dashboard', component: CudComponent },
          { path: '', redirectTo: '/home', pathMatch: 'full' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}

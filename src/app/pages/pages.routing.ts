import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';
import { PagesComponent } from './pages.component';
import { PostsComponent } from './posts/posts.component';
import { AboutComponent } from './about/about.component';
import { PostComponent } from './post/post.component';
import { CudComponent } from './cud/cud.component';


const routes: Routes = [
    { 
        path: '',
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
          { path: 'home',  component: PostsComponent, data: { titulo: 'Home' } },
          { path: 'about',  component: AboutComponent, data: { titulo: 'Nosotros' } },
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

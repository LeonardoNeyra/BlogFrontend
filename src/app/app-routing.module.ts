import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Modules
import { PagesRoutingModule } from './pages/pages.routing';
// Components
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { AuthRoutingModule } from './auth/auth.routing';


const routes: Routes = [
  { path: '**', component: NopagefoundComponent }
];

@NgModule({
  imports: [ 
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

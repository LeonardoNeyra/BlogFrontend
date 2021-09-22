import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PostsComponent } from './pages/posts/posts.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { CudComponent } from './pages/cud/cud.component';
import { JumbotronComponent } from './component/jumbotron/jumbotron.component';
import { PostComponent } from './component/post/post.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { RegisterComponent } from './auth/register/register.component';
import { PagesComponent } from './pages/pages.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PostsComponent,
    AboutComponent,
    LoginComponent,
    CudComponent,
    JumbotronComponent,
    PostComponent,
    NopagefoundComponent,
    RegisterComponent,
    PagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

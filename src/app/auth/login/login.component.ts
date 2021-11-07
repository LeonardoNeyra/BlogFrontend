import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Parametros globales
  public formSubmitted = false;
  public auth2: any;
  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [ Validators.required, Validators.email ] ],
    password: ['user2', [ Validators.required, Validators.minLength(4) ]],
    remember: [false]
  });

  // Funciones primarias
  constructor( private router: Router, private fb: FormBuilder, private usuarioService: UsuarioService, private ngZone: NgZone ) { }

  ngOnInit() {
    this.renderButton();
  }

  // Funciones custom
  login() {

    this.usuarioService.login(this.loginForm.value)
      .subscribe(resp => {
        console.log(resp);
        this.router.navigateByUrl('/');

      }, (err) => {
        let mensaje = '';
        console.log(err);

        if ( err.status == 0 ) {
          mensaje = ('Servicio inaccesible. ').concat(err.statusText);
          console.log(err.message);
        }
        else {
          mensaje = err.error.msg;
        }

        Swal.fire({
          title: '!Error!',
          text: mensaje,
          icon: 'error',
          confirmButtonText: 'Okay 😢'
        });
      });
    
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });

    this.startApp();
  }

  async startApp() {
    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;

    this.attachSignin(document.getElementById('my-signin2'));
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          var id_token = googleUser.getAuthResponse().id_token;

          this.usuarioService.loginGoogle(id_token)
            .subscribe( resp => {
              this.ngZone.run(() => {
                this.router.navigateByUrl('/');
              });
            });

        }, function(error) {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}

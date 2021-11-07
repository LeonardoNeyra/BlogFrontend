import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;
  public registerForm = this.fb.group({
    nombre: ['Leonardo', [ Validators.required, Validators.minLength(3) ]],
    alias: ['Gunter', [ Validators.required, Validators.minLength(1) ]],
    email: ['test@gmail.com', [ Validators.required, Validators.email ] ],
    password: ['123456', [ Validators.required, Validators.minLength(4) ]],
    password2: ['123456', [ Validators.required, Validators.minLength(4) ]],
    terminos: [ false, Validators.required ]
  });

  constructor( private fb: FormBuilder, private usuarioService: UsuarioService, private router:Router ) { }

  crearUsuario() {
    this.formSubmitted = true;
    // console.log(this.registerForm);
    
    if ( this.registerForm.invalid ) {
      return;
    }
    
    this.usuarioService.crearUsuario(this.registerForm.value)
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

  passNoValido() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if ( (pass1 !== pass2) && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }

  campoNoValido( campo: string, tipo: number ): boolean {
    if ( tipo == 1) {

      if ( this.registerForm.get(campo).invalid && this.formSubmitted ) {
        return true;
      }
      else {
        return false;
      }

    }
    else{

      return !this.registerForm.get(campo).value && this.formSubmitted
    }
  }

  passwordsIguales( pass1: string, pass2: string ) {

    return ( formGroup: FormGroup ) => {
      const p1Control = formGroup.get(pass1);
      const p2Control = formGroup.get(pass2);

      if ( p1Control.value === p2Control.value ) {
        p2Control.setErrors(null)
      }
      else {
        p2Control.setErrors({ noEsIgual: true })
      }
    }
  }
}

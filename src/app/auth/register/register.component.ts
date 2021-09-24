import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public registerForm = this.fb.group({
    nombre: ['Leonardo', [ Validators.required, Validators.minLength(2) ]],
    email: ['Leonardo@gmail.com', Validators.required ],
    password1: ['123456', [ Validators.required, Validators.minLength(8) ]],
    password2: ['123456', [ Validators.required, Validators.minLength(8) ]],
    terminos: [ false, Validators.required ]
  });

  constructor( private fb: FormBuilder) { }

  crearUsuario() {
    console.log(this.registerForm.value);
  }

}

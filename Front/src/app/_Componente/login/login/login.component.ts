import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../../_Servicio/login.service";
import {LoginRequest} from "../../../_Modelo/loginRequest";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginRequest: LoginRequest = new LoginRequest();
  mensajeError: string | null = null;

  constructor
  (
    private router: Router,
    private loginService: LoginService,
  ) { }

  onSubmit() {
    this.logueo();
  }

  logueo () {
    this.loginService.login(this.loginRequest).subscribe(
      {
        next: (datos) => {
          localStorage.setItem('idUsuario', String(datos.idUsuario))
          localStorage.setItem('mensaje', datos.mensajeLogin);
          localStorage.setItem('rolUsuario', datos.rolUsuario);
          localStorage.setItem('nombrePila', datos.nombrePila);
          localStorage.setItem('apellido', datos.apellido);
          localStorage.setItem('nombreUsuario', datos.nombreUsuario);
          localStorage.setItem('estado', String(datos.estado));
          this.router.navigate(['/menuPrincipal']);

          console.log(localStorage.getItem('idUsuario'))
          console.log(localStorage.getItem('mensaje'));
          console.log(localStorage.getItem('rolUsuario'));
          console.log(localStorage.getItem('nombrePila'));
          console.log(localStorage.getItem('apellido'));
          console.log(localStorage.getItem('nombreUsuario'));
          console.log(localStorage.getItem('estado'));
        },
        error: (err: any) => {
          console.log(err);
          this.mensajeError = "Nombre de usuario o contraseña incorrectos.";
        }
      }
    )
  }

}

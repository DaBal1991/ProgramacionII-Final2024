import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {LoginService} from "../../../_Servicio/login.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-menu-principal',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './menu-principal.component.html',
  styleUrl: './menu-principal.component.css'
})
export class MenuPrincipalComponent {

  idUsuario: string | null = localStorage.getItem('idUsuario');
  nombreUsuario: string | null = localStorage.getItem('nombreUsuario');
  rolUsuario: string | null = localStorage.getItem('rolUsuario');
  nombrePila: string | null = localStorage.getItem('nombrePila');
  apellido: string | null = localStorage.getItem('apellido');

  constructor
  (
    private loginService: LoginService,
    private router: Router,
  ) { }

  public isPermitido(rol: string) {
    return this.loginService.isRolPermitido(rol);
  }


}

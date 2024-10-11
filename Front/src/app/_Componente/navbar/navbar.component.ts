import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {LoginService} from "../../_Servicio/login.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(
    private router: Router,
    private loginService: LoginService,
  ) { }

  public isConectado() {
    return this.loginService.isConectado();
  }

  public cerrarSesion() {
    this.loginService.limpiarDatos();
    this.router.navigate(['/inicio'])
  }

  public isPermitido(rol: string) {
    return this.loginService.isRolPermitido(rol);
  }

}

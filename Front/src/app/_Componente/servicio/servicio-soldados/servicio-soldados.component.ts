import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {LoginService} from "../../../_Servicio/login.service";
import {CuerpoService} from "../../../_Servicio/cuerpo.service";
import {Soldado} from "../../../_Modelo/soldado";
import {ServicioService} from "../../../_Servicio/servicio.service";

@Component({
  selector: 'app-servicio-soldados',
  standalone: true,
    imports: [
        NgForOf,
        NgIf,
        RouterLink
    ],
  templateUrl: './servicio-soldados.component.html',
  styleUrl: './servicio-soldados.component.css'
})
export class ServicioSoldadosComponent {

  soldados: Soldado[];
  id: number;
  // ordenAscendente: boolean = true;

  constructor
  (
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private servicioService: ServicioService
  ) { }

  graduacionSoldados: { [rango: string]: string } = {
    'Voluntario de Primera': '/assets/imgs/rangoSoldado/19.png',
    'Voluntario de Segunda': '/assets/imgs/rangoSoldado/20.png',
    'Voluntario de Segunda en Comisión': '/assets/imgs/rangoSoldado/21.png',
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.servicioService.obtenerSoldadosAsignadosServicio(this.id).subscribe(
      {
        next: datos => {
          this.soldados = datos;
        }
      }
    )
  }

  public isPermitido(rol: string) {
    return this.loginService.isRolPermitido(rol);
  }

  getImagenGraduacion(graduacion: string): string {
    return this.graduacionSoldados[graduacion];
  }

  /*

  ordernarPorApellido() {
    this.soldados.sort((a,b) => {
      const apellidoA = a.apellido.toLowerCase();
      const apellidoB = b.apellido.toLowerCase();

      if(apellidoA < apellidoB) return this.ordenAscendente ? -1 : 1;
      if(apellidoA > apellidoB) return this.ordenAscendente ? 1 : -1;
      return 0;
    });

    this.ordenAscendente = !this.ordenAscendente;
  }

   */

}

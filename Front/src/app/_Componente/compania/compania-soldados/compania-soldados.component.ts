import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Soldado} from "../../../_Modelo/soldado";
import {LoginService} from "../../../_Servicio/login.service";
import {CompaniaService} from "../../../_Servicio/compania.service";

@Component({
  selector: 'app-compania-soldados',
  standalone: true,
    imports: [
        NgForOf,
        NgIf,
        RouterLink
    ],
  templateUrl: './compania-soldados.component.html',
  styleUrl: './compania-soldados.component.css'
})
export class CompaniaSoldadosComponent {

  soldados: Soldado[];
  id: number;
  // ordenAscendente: boolean = true;

  constructor
  (
    private loginService: LoginService,
    private companiaService: CompaniaService,
    private activatedRoute: ActivatedRoute
  ) { }

  graduacionSoldados: { [rango: string]: string } = {
    'Voluntario de Primera': '/assets/imgs/rangoSoldado/19.png',
    'Voluntario de Segunda': '/assets/imgs/rangoSoldado/20.png',
    'Voluntario de Segunda en Comisión': '/assets/imgs/rangoSoldado/21.png',
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.companiaService.obtenerSoldadosAsignadosCompania(this.id).subscribe(
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

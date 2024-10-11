import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Soldado} from "../../../_Modelo/soldado";
import {SoldadoService} from "../../../_Servicio/soldado.service";
import {LoginService} from "../../../_Servicio/login.service";
import {Asignador} from "../../../_Modelo/asignador";
import {AsignadorService} from "../../../_Servicio/asignador.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-listado-asignador',
  standalone: true,
    imports: [
        NgForOf,
        NgIf,
        RouterLink,
        FormsModule
    ],
  templateUrl: './listado-asignador.component.html',
  styleUrl: './listado-asignador.component.css'
})
export class ListadoAsignadorComponent {

  asignaciones: Asignador[];
  criterioBusqueda: string = '';
  asignacionesBuscadas: Asignador[] = [];

  id: number;

  constructor(
    private asignadorService: AsignadorService,
    private router: Router,
    private loginService: LoginService
  ) {
  }

  ngOnInit() {
    this.obtenerAsignaciones();
  }

  private obtenerAsignaciones() {
    this.asignadorService.obtenerListadoAsignaciones().subscribe(
      (datos => {
        this.asignaciones = datos;
        this.asignacionesBuscadas = this.asignaciones;
      })
    );
  }

  buscarAsignacion() {
    if (this.criterioBusqueda.trim() === '') {
      this.asignacionesBuscadas = this.asignaciones;
    } else {
      this.asignacionesBuscadas = this.asignaciones.filter(asignacion =>
        asignacion.id.toString().includes(this.criterioBusqueda) ||
        asignacion.soldado.nombrePila.toLowerCase().includes(this.criterioBusqueda.toLowerCase()) ||
        asignacion.soldado.apellido.toLowerCase().includes(this.criterioBusqueda.toLowerCase()) ||
        asignacion.servicio.descripcion.toLowerCase().includes(this.criterioBusqueda.toLowerCase())
      );
    }
  }

  /*
  editarAsignacion(id: number) {
    this.router.navigate(['editarSoldado', id]);
  }
   */

  finAsignacion(id: number) {
    this.asignadorService.finAsignacion(id).subscribe(
      {
        next: () => this.obtenerAsignaciones(),
        error: (err: any) => console.log(err)
      }
    )
  }

  bajaAsignacion(id: number) {
    this.asignadorService.bajaAsignacion(id).subscribe(
      {
        next: () => this.obtenerAsignaciones(),
        error: (err: any) => console.log(err)
      }
    )
  }

  public isPermitido(rol: string) {
    return this.loginService.isRolPermitido(rol);
  }
}

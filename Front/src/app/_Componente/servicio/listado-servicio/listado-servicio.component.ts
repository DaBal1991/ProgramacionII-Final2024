import { Component } from '@angular/core';
import {Cuerpo} from "../../../_Modelo/cuerpo";
import {CuerpoService} from "../../../_Servicio/cuerpo.service";
import {Router, RouterLink} from "@angular/router";
import {LoginService} from "../../../_Servicio/login.service";
import {Servicio} from "../../../_Modelo/servicio";
import {ServicioService} from "../../../_Servicio/servicio.service";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-listado-servicio',
  standalone: true,
    imports: [
        NgForOf,
        NgIf,
        RouterLink,
        FormsModule
    ],
  templateUrl: './listado-servicio.component.html',
  styleUrl: './listado-servicio.component.css'
})
export class ListadoServicioComponent {

  servicios: Servicio[];
  criterioBusqueda: string = '';
  serviciosBuscados: Servicio[] = [];

  constructor(
    private servicioService: ServicioService,
    private router: Router,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.obtenerServicio();
  }

  private obtenerServicio() {
    this.servicioService.obtenerListadoServicios().subscribe(
      (datos => {
        this.servicios = datos;
        this.serviciosBuscados = this.servicios;
      })
    );
  }

  buscarServicio() {
    if (this.criterioBusqueda.trim() === '') {
      this.serviciosBuscados = this.servicios;
    } else {
      this.serviciosBuscados = this.servicios.filter(servicio =>
        servicio.id.toString().includes(this.criterioBusqueda) ||
        servicio.descripcion.toLowerCase().includes(this.criterioBusqueda.toLowerCase())
      );
    }
  }

  editarServicio(id: number) {
    this.router.navigate(['/editarServicio', id]);
  }

  soldadosAsignados(id: number) {
    this.router.navigate(['/soldadosEnServicio', id]);
  }

  bajaServicio(id: number) {
    this.servicioService.bajaServicio(id).subscribe(
      {
        next: (datos) => this.obtenerServicio(),
        error: (err: any) => console.log(err)
      }
    )
  }

  public isPermitido(rol: string) {
    return this.loginService.isRolPermitido(rol);
  }



}

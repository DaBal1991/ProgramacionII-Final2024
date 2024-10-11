import { Component } from '@angular/core';
import {Soldado} from "../../../_Modelo/soldado";
import {SoldadoService} from "../../../_Servicio/soldado.service";
import {ActivatedRoute, Router} from "@angular/router";
import { Asignador } from '../../../_Modelo/asignador';
import { Servicio } from '../../../_Modelo/servicio';
import {AsignadorService} from "../../../_Servicio/asignador.service";
import {ServicioService} from "../../../_Servicio/servicio.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-registro-asignador',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './registro-asignador.component.html',
  styleUrl: './registro-asignador.component.css'
})
export class RegistroAsignadorComponent {

  id: number;

  asignador: Asignador = {
    id: 0,
    fechaInicio: '',
    fechaFin: '',
    soldado: {
      id: 0,
      nombrePila: '',
      apellido: ''
    },
    servicio: {
      id: 0,
      descripcion: '',
    }
  }

  soldadosActivos: Soldado[];
  serviciosActivos: Servicio[];

  constructor(
    private soldadoService: SoldadoService,
    private asignadorService: AsignadorService,
    private servicioService: ServicioService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.traerSoldadosActivos();
    this.traerServiciosActivos();
  }

  onSubmit() {
    this.registrarAsignacion();
  }

  registrarAsignacion() {
    this.asignadorService.registrarAsignacion(this.asignador).subscribe(
      {
        next: (datos) => {
          this.irListaAsignaciones();
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    );
  }

  irListaAsignaciones() {
    this.router.navigate(['/listarAsignaciones']);
  }

  traerSoldadosActivos() {
    this.soldadoService.obtenerListadoSoldadosActivos().subscribe(
      {
        next: (datos) => {
          this.soldadosActivos = datos;
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    )
  }

  traerServiciosActivos() {
    this.servicioService.obtenerListadoServiciosActivos().subscribe(
      {
        next: (datos) => {
          this.serviciosActivos = datos;
        },
        error: (err: any) => {
          console.log(err)
        }
      }
    )
  }

}

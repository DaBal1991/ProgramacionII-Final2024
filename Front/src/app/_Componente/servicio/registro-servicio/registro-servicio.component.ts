import { Component } from '@angular/core';
import {Cuerpo} from "../../../_Modelo/cuerpo";
import {CuerpoService} from "../../../_Servicio/cuerpo.service";
import {Router} from "@angular/router";
import {Servicio} from "../../../_Modelo/servicio";
import {ServicioService} from "../../../_Servicio/servicio.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-registro-servicio',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf
    ],
  templateUrl: './registro-servicio.component.html',
  styleUrl: './registro-servicio.component.css'
})
export class RegistroServicioComponent {

  servicio: Servicio = {
    id: 0,
    descripcion: '',
    estado: true
  };

  constructor(
    private servicioService: ServicioService,
    private router: Router,
  ) {

  }

  ngOnInit() {

  }

  onSubmit() {
    this.registrarServicio();
  }

  registrarServicio() {
    this.servicioService.registrarServicios(this.servicio).subscribe(
      {
        next: (datos) => {
          this.irListadoServicios();
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    );
  }

  irListadoServicios() {
    this.router.navigate(['/listarServicios']);
  }

}

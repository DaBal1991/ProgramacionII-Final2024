import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Servicio} from "../../../_Modelo/servicio";
import {ServicioService} from "../../../_Servicio/servicio.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-editar-servicio',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf
    ],
  templateUrl: './editar-servicio.component.html',
  styleUrl: './editar-servicio.component.css'
})
export class EditarServicioComponent {

  servicio: Servicio = new Servicio();
  id: number;

  constructor(
    private servicioService: ServicioService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.servicioService.obtenerServicioPorId(this.id).subscribe(
      {
        next: (datos) => {
          this.servicio = datos;
          console.log(this.servicio);
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    )
  }

  onSubmit() {
    this.confirmarEdicion();
  }

  confirmarEdicion() {
    this.servicioService.modificarServicio(this.id, this.servicio).subscribe(
      {
        next: (datos) => this.irListaServicios(),
        error: (err: any) => console.log(err),
      }
    );
  }

  irListaServicios() {
    this.router.navigate(['/listarServicios']);
  }

}

import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Soldado} from "../../../_Modelo/soldado";
import {Compania} from "../../../_Modelo/compania";
import {Cuartel} from "../../../_Modelo/cuartel";
import {Cuerpo} from "../../../_Modelo/cuerpo";
import {SoldadoService} from "../../../_Servicio/soldado.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CuartelService} from "../../../_Servicio/cuartel.service";
import {CuerpoService} from "../../../_Servicio/cuerpo.service";
import {CompaniaService} from "../../../_Servicio/compania.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-editar-cuartel',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf
    ],
  templateUrl: './editar-cuartel.component.html',
  styleUrl: './editar-cuartel.component.css'
})
export class EditarCuartelComponent {

  cuartel: Cuartel = new Cuartel();
  id: number;

  constructor(
    private cuartelService: CuartelService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.cuartelService.obtenerCuartelPorId(this.id).subscribe(
      {
        next: (datos) => {
          this.cuartel = datos;
          console.log(this.cuartel);
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
    this.cuartelService.modificarCuartel(this.id, this.cuartel).subscribe(
      {
        next: (datos) => this.irListaCuarteles(),
        error: (err: any) => console.log(err),
      }
    );
  }

  irListaCuarteles() {
    this.router.navigate(['/listarCuarteles']);
  }

}

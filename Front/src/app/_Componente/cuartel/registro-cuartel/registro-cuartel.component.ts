import { Component } from '@angular/core';
import {Cuartel} from "../../../_Modelo/cuartel";
import {CuartelService} from "../../../_Servicio/cuartel.service";
import {Router} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-registro-cuartel',
  standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        ReactiveFormsModule,
        NgIf
    ],
  templateUrl: './registro-cuartel.component.html',
  styleUrl: './registro-cuartel.component.css'
})
export class RegistroCuartelComponent {

  cuartel: Cuartel = {
    id: 0,
    nombreCuartel: '',
    ubicacion: '',
    estado: true
  };

  constructor(
    private cuartelService: CuartelService,
    private router: Router,
  ) {

  }

  ngOnInit() {

  }

  onSubmit() {
    this.registrarCuartel();
  }

  registrarCuartel() {
    this.cuartelService.registrarCuartel(this.cuartel).subscribe(
      {
        next: (datos) => {
          this.irListadoCuarteles();
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    );
  }

  irListadoCuarteles() {
    this.router.navigate(['/listarCuarteles']);
  }

}

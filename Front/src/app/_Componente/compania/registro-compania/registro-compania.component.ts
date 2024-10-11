import { Component } from '@angular/core';
import {Cuartel} from "../../../_Modelo/cuartel";
import {CuartelService} from "../../../_Servicio/cuartel.service";
import {Router} from "@angular/router";
import {Compania} from "../../../_Modelo/compania";
import {CompaniaService} from "../../../_Servicio/compania.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-registro-compania',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './registro-compania.component.html',
  styleUrl: './registro-compania.component.css'
})
export class RegistroCompaniaComponent {

  compania: Compania = {
    id: 0,
    actividad: '',
    estado: true
  };

  constructor(
    private companiaService: CompaniaService,
    private router: Router,
  ) {

  }

  ngOnInit() {

  }

  onSubmit() {
    this.registrarCompania();
  }

  registrarCompania() {
    this.companiaService.registrarCompania(this.compania).subscribe(
      {
        next: (datos) => {
          this.irListadoCompanias();
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    );
  }

  irListadoCompanias() {
    this.router.navigate(['/listarCompanias']);
  }


}
